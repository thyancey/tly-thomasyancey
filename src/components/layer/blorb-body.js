import React, { Component } from 'react';

require('./style.less');

export default class BlorbBody extends Component {

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

      let imageSrc;
      if(blorb.image.indexOf('http') === 0){
        imageSrc = blorb.image;
      }else{
        imageSrc = require('src/images/layers/' + blorb.image);
      }

      return (
        <div key={idx} className={`blorb blorb-image ${blorbSize} ${modClass} ${activeClass}`} onClick={clickHandler}>
          <img src={imageSrc}/>
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
    }else if(blorb.link){
      
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
        <div key={idx} className={`blorb blorb-link ${blorbSize} ${modClass} ${activeClass}`} onClick={clickHandler}>
          <a href={blorb.link} target="_blank">{blorb.linkText || blorb.link}</a>
        </div>
      );
    }else{
      console.error('blorbs must either have text or an image.');
      return null;
    } 
  }


  render(){
    const { blorbs } = this.props;

    return (
      <div className="layer-detail-body">
        {blorbs.map((blorb, idx) => this.renderBlorbGroup(blorb, idx))}
      </div>
    );
  }
}