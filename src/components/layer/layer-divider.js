import React, { Component } from 'react';

require('./style.less');
require('./dividers.less');

export default class LayerDivider extends Component {

  render(){
    let className = 'layer-divider';
    if(this.props.theme){
      className += ` dividertheme-${this.props.theme}`;
    }
    return (
      <div className={className}>
        <div className="layer-divider-body"/>
      </div>
    );
  }
}