import React, { Component } from 'react';

require('./style.less');

export default class LayerDetail extends Component {

  renderBlorb(blorb, idx){
    let blorbSize = 'mod-' + blorb.width;
    if(blorb.text){
      return (
        <div key={idx} className={`blorb blorb-text ${blorbSize}`}>
          <p>{blorb.text}</p>
        </div>
      );
    }else if(blorb.image){
      return (
        <div key={idx} className={`blorb blorb-image ${blorbSize}`}>
          <img src={require('src/images/layers/' + blorb.image)}/>
        </div>
      );
    }else{
      console.error('blorbs must either have text or an image.');
      return null;
    } 
  }


  render(){
    const { detailObj } = this.props;

    let className = 'layer-detail layer-bubble';

    return (
      <div className={className}>
        <div className="layer-detail-headers">
          <h2>{detailObj.title}</h2>
          <h3>{detailObj.description}</h3>
        </div>
        <div className="layer-detail-body">
          {detailObj.blorbs.map((blorb, idx) => this.renderBlorb(blorb, idx))}
        </div>
      </div>
    );
  }
}