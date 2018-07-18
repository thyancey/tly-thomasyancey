import React, { Component } from 'react';

import { connect } from 'src/store';
import Detail from './detail';

require('./style.less');

export default class Layer extends Component {
  renderDetails(detailsArray){
    return detailsArray.map((dt, idx) => (<Detail key={idx} detailObj={dt}/>));
  }

  render(){
    const { layerObj, height } = this.props;

    return (
      <section className="layer" >
        <div className="layer-title layer-bubble">
          <h1>{layerObj.title}</h1>
          <h2>{layerObj.description}</h2>
          <p>{layerObj.text}</p>
        </div>
        {this.renderDetails(layerObj.details)}
      </section>
    );
  }
}