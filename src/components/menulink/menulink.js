import React, { Component } from 'react';
import Icon_Drag from 'src/images/icons/drag-indicator.svg';

require('./style.less');

export default class MenuLink extends Component {
  render() {
    const { idx, isCurrent, region } = this.props;
    let className = 'menulink';
    if(isCurrent){
      className += ' mod-active';
    }

    if(this.props.layerData){
      return(
        <a className={className} onClick={this.props.onMenuLink}>
          <h4>{this.props.layerData.title}</h4>
        </a>
      );
    }else{
      //- this is the middle one
      return(
        <a className={className} onClick={this.props.onMenuLink}>
          <h4>{'Home'}</h4>
        </a>
      );
    }


  }
}


/* 
        <h4>{this.props.layerData.title}</h4>*/