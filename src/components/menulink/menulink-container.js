import React, { Component } from 'react';

import { connect } from 'src/store';

import MenuLink from './menulink';
import { jobs as JobData, projects as ProjectData } from 'src/data/data.js';
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

  onMenuLink(idx){
    this.props.actions.setTargetLayerIdx(idx);
  }

  renderMiddleLink(curIdx){
    return (
        <MenuLink   isCurrent={curIdx === 'middle'}
                    region={'middle'}
                    id={'middle'}
                    onMenuLink={e => this.onMenuLink('middle')}>
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

  renderMenuLink(region, layerData, idx, curLayerIdx, ){
    const layerIdx = region + '-' + idx;

    return (
      <MenuLink     idx={layerIdx} 
                    layerData={layerData}
                    key={idx} 
                    isCurrent={curLayerIdx === layerIdx}
                    region={region}
                    onMenuLink={e => this.onMenuLink(layerIdx)}>
      </MenuLink>
    );
  }

  renderMenuLinks(region, layerData, curLayerIdx, reverseOrder){
    const retVal = [];
    if(!reverseOrder){
      for(let i = 0; i < layerData.length; i++){
        retVal.push(this.renderMenuLink(region, layerData[i], i, curLayerIdx));
      }
    }else{
      for(let i = layerData.length - 1; i >= 0; i--){
        retVal.push(this.renderMenuLink(region, layerData[i], i, curLayerIdx));
      }
    }

    return retVal;
  }

  renderTopMenuLinkGroup(){
    if(this.props.curRegion === 'top'){
      return (
        <div className="menulinks-group-container" >
          <p className="menulinks-group-label mod-top" onClick={e => this.onMenuLink('top-0')}>
            {'projects'}
          </p>
          <div className="menulinks-group mod-top">
            {this.renderMenuLinks('top', ProjectData, this.props.curLayerIdx, true)}
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

  renderBottomMenuLinkGroup(){
    if(this.props.curRegion === 'bottom'){
      return (
        <div className="menulinks-group-container" >
          <p className="menulinks-group-label mod-bottom" onClick={e => this.onMenuLink('bottom-0')}>
            {'career'}
          </p>
          <div className="menulinks-group mod-bottom">
            {this.renderMenuLinks('bottom', JobData, this.props.curLayerIdx)}
          </div>
        </div>
      );
    }
  }

  renderMenuLinkGroups(){
    return (
      <div className="menulinks-menus-container">
        {this.renderTopMenuLinkGroup()}
        {this.renderMiddleMenuLinkGroup()}
        {this.renderBottomMenuLinkGroup()}
      </div>
    );
  }

  renderMenuLinkButton(){
    if(this.props.curRegion !== 'middle'){
      return(
        <div className="menulinks-openbutton" onMouseEnter={e => this.onMenuButtonEnter(e)}>
          <h4>{this.props.curRegion === 'bottom' ? 'Home' : 'Home'}</h4>
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
        {this.renderMenuLinkGroups()}
      </div>
    )
  }

}

export default connect(state => ({ 
  curLayerIdx: state.curLayerIdx
}))(MenuLinks);
