import React, { Component } from 'react';

require('./style.less');

export default class LayerDivider extends Component {

  render(){
    return (
      <div className="layer-divider">
        <div className="layer-divider-body"/>
      </div>
    );
  }
}