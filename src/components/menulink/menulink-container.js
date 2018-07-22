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

  renderMenuLinks(region, layerData, curLayerIdx){
    const retVal = [];
    for(let i = 0; i < layerData.length; i++){
      const layerIdx = region + '-' + i;

      retVal.push(
        <MenuLink     idx={layerIdx} 
                      layerData={layerData[i]}
                      key={i} 
                      isCurrent={curLayerIdx === layerIdx}
                      region={region}
                      onMenuLink={e => this.onMenuLink(layerIdx)}>
          {i}
        </MenuLink>
      );
    }

    return retVal;
  }


  render(){
    let className = `menulinks-container region-${this.props.curRegion}`;
    if(this.state.active){
      className += ' mod-active';
    }

    return(
      <div className={className} onMouseLeave={e => this.onMenuLeave(e)}>
        <div className="menulinks-button" onMouseEnter={e => this.onMenuButtonEnter(e)}>
          <h3>{'Jump To'}</h3>
        </div>
        <div className="menulinks">
          <div className="menulinks-group mod-top">
            {this.renderMenuLinks('top', ProjectData, this.props.curLayerIdx)}
          </div>
          <div className="menulinks-group mod-middle">
            {this.renderMiddleLink(this.props.curLayerIdx)}
          </div>
          <div className="menulinks-group mod-bottom">
            {this.renderMenuLinks('bottom', JobData, this.props.curLayerIdx)}
          </div>
        </div>
      </div>
    )
  }

}

export default connect(state => ({ 
  curLayerIdx: state.curLayerIdx
}))(MenuLinks);
