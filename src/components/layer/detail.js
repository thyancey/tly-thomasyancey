import React, { Component } from 'react';

require('./style.less');

export default class Detail extends Component {
  render(){
    const { detailObj } = this.props;

    return (
      <div className="layer-detail layer-bubble">
        <h2>{detailObj.title}</h2>
        <h3>{detailObj.description}</h3>
        <p>{detailObj.text}</p>
      </div>
    );
  }
}