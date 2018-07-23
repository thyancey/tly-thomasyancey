import React, { Component } from 'react';

import LayerDetail from './layer-detail';

require('./style.less');

export default class Layer extends Component {
  renderDetails(detailsArray){
    return detailsArray.map((dt, idx) => (<LayerDetail key={idx} detailObj={dt}/>));
  }

  render(){
    const { layerObj, counter } = this.props;

    let className = 'layer';
    if(layerObj.theme){
      className += ' theme-' + layerObj.theme;
    }else{
      className += ' theme-' + this.props.region;
    }

    return (
      <section className={className} data-idx={this.props.region + '-' + counter} data-theme={layerObj.theme} >
        <div className="layer-title layer-bubble">
          <h1>{layerObj.title}</h1>
          {layerObj.description && (<h2>{layerObj.description}</h2>)}
          {layerObj.date && (<h3>{layerObj.date}</h3>)}
          <div className="layer-title-text">
            <p>{layerObj.text}</p>
          </div>
        </div>
        {this.renderDetails(layerObj.details)}
      </section>
    );
  }
}