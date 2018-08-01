import React, { Component } from 'react';
import Icon_GoBackUp from '../../images/icons/expand-less.svg';

require('./style.less');

export default class LayerDetail extends Component {

  renderBlorbGroup(blorbGroup, idx){
    return (
      <div key={idx} className="blorbgroup">
        {blorbGroup.map((blorb, bIdx) => (
          this.renderBlorb(blorb, bIdx)
        ))}
      </div>
    );
  }

  renderBlorb(blorb, idx){
    let blorbSize = 'mod-' + blorb.width;
    if(blorb.text){
      //- this text node can be a string or an array. a <p> will be made for each text item
      if(blorb.text.constructor !== Array){
        blorb.text = [ blorb.text ];
      }
      return (
        <div key={idx} className={`blorb blorb-text ${blorbSize}`}>
          {blorb.title && (<h4>{blorb.title}</h4>)}
          {blorb.text.map((t, idx) => (<p key={idx}>{t}</p>))}
        </div>
      );
    }else if(blorb.image){
      let modClass = '';
      if(blorb.mod){
        modClass = 'mod-' + blorb.mod;
      }

      let activeClass = '';

      let clickHandler = null;
      if(blorb.link){
        clickHandler = ( e => { global.open(blorb.link, '_blank') } );
      }

      if(clickHandler){
        activeClass = 'mod-active';
      }

      return (
        <div key={idx} className={`blorb blorb-image ${blorbSize} ${modClass} ${activeClass}`} onClick={clickHandler}>
          <img src={require('src/images/layers/' + blorb.image)}/>
        </div>
      );
    }else if(blorb.bullets){
      return (
        <ul key={idx}>
          {blorb.bullets.map((item, bIdx) => (
            <li key={bIdx}>{item}</li>
          ))}
        </ul>
      );
    }{
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
          {detailObj.description && (<h3>{detailObj.description}</h3>)}
          <a  className="layer-detail-jumptop" 
              title={this.props.layerTitle} 
              onClick={e => this.props.skipToTop()}>
            <p>{this.props.layerTitle}</p>
            <div className="icon-container">
              <Icon_GoBackUp />
            </div>
          </a>
        </div>
        <div className="layer-detail-body">
          {detailObj.blorbs.map((blorb, idx) => this.renderBlorbGroup(blorb, idx))}
        </div>
      </div>
    );
  }
}