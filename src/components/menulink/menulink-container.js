import React, { Component } from 'react';

import { connect } from 'src/store';

import MenuLink from './menulink';
import JobData from 'src/data/jobdata.js';
import ProjectData from 'src/data/projectdata.js';
import BlogData from 'src/data/blogdata.js';
import { getFilteredBlogPosts } from 'src/utils/blog-utils';

require('./style.less');

class MenuLinks extends Component {
  constructor(){
    super();

    this.state = {
      active: false
    }
  }

  componentDidUpdate(prevProps, prevState){
    //- prevents the menu from staying open when jumping between top -> home -> bottom
    if(prevProps.curRegion !== this.props.curRegion){
      this.setState({active:false});
    }
  }

  onMenuLink(e, idx){
    /* the propagation rules are here so that when a current menu item is clicked that happens to be over the middle nav, it doesnt trigger a middle menu click */
    e.stopPropagation();
    this.props.actions.setTargetLayerIdx(idx);
  }

  renderMiddleLink(curIdx){
    return (
        <MenuLink   isCurrent={curIdx === 'middle'}
                    region={'middle'}
                    title={null}
                    id={'middle'}
                    onMenuLink={e => this.onMenuLink(e, 'middle')}>
        </MenuLink>
    );
  }

  onMenuLeave(mouseEvent){
    // console.log('menu leave', mouseEvent);
    this.setState({active: false});
  }

  onMenuButtonEnter(mouseEvent){
    // console.log('menu button enter', mouseEvent);
    this.setState({active: true});
  }

  renderMenuLink(region, title, idx, curLayerIdx){
    const layerIdx = region + '-' + idx;
    // console.log(curLayerIdx, layerIdx)

    return (
      <MenuLink     idx={layerIdx} 
                    title={title}
                    key={idx} 
                    isCurrent={curLayerIdx === layerIdx}
                    region={region}
                    onMenuLink={e => this.onMenuLink(e, layerIdx)}>
      </MenuLink>
    );
  }

  renderMenuLinks(region, linkLabels, curLayerIdx, reverseOrder){
    const retVal = [];
    // console.log(curLayerIdx);
    if(!reverseOrder){
      for(let i = 0; i < linkLabels.length; i++){
        retVal.push(this.renderMenuLink(region, linkLabels[i], i, curLayerIdx));
      }
    }else{
      for(let i = linkLabels.length - 1; i >= 0; i--){
        retVal.push(this.renderMenuLink(region, linkLabels[i], i, curLayerIdx));
      }
    }

    return retVal;
  }

  renderTopMenuLinkGroup(){
    if(this.props.curRegion === 'top'){
      const linkLabels = ProjectData.map(pd => pd.linkTitle || pd.title);
      return (
        <div className="menulinks-group-container" >
          <p className="menulinks-group-label mod-top" onClick={e => this.onMenuLink(e, 'top-0')}>
            {'projects'}
          </p>
          <div className="menulinks-group mod-top">
            {this.renderMenuLinks('top', linkLabels, this.props.curLayerIdx, true)}
          </div>
        </div>
      );
    }
  }

  renderMiddleMenuLinkGroup(){
    if(this.props.curRegion !== 'middle'){
      return (
        <div className="menulinks-group-container" >
          <div className="menulinks-group mod-middle">
            {this.renderMiddleLink(this.props.curLayerIdx)}
          </div>
        </div>
      );
    }
  }

  renderBottomMenuLinkGroup(bottomMode, currentTags){
    if(this.props.curRegion === 'bottom'){
      let linkLabels;
      let label;
      
      if(bottomMode === 'job'){
        label = 'career';
        linkLabels = JobData.map(pd => pd.linkTitle || pd.title);
      }else{
        label = 'blog';
        linkLabels = getFilteredBlogPosts(BlogData, currentTags).map(pd => `#${pd.entry}: ` + (pd.linkTitle || pd.title));
      }
      return (
        <div className="menulinks-group-container" >
          <p className="menulinks-group-label mod-bottom" onClick={e => this.onMenuLink(e, 'bottom-0')}>
            {label}
          </p>
          <div className="menulinks-group mod-bottom">
            {this.renderMenuLinks('bottom', linkLabels, this.props.curLayerIdx)}
          </div>
        </div>
      );
    }
  }
  
  renderMenuLinkButton(){
    if(this.props.curRegion !== 'middle'){
      return(
        <div className="menulinks-openbutton" onMouseEnter={e => this.onMenuButtonEnter(e)}>
          <h4>{'Skip to...'}</h4>
        </div>
      );
    }else{
      return null;
    }
  }


  render(){
    let className = `menulinks-container region-${this.props.curRegion}`;
    if(this.state.active){
      className += ' mod-active';
    }

    return(
      <div className={className} onMouseLeave={e => this.onMenuLeave(e)}>
        {this.renderMenuLinkButton()}
        <div className="menulinks-menus-container">
          {this.renderTopMenuLinkGroup()}
          {this.renderMiddleMenuLinkGroup()}
          {this.renderBottomMenuLinkGroup(this.props.bottomMode, this.props.currentTags)}
        </div>
      </div>
    )
  }

}

export default connect(state => ({ 
  bottomMode: state.bottomMode,
  curLayerIdx: state.curLayerIdx,
  currentTags: state.currentTags
}))(MenuLinks);
