import React, { Component } from 'react';
import Icon_GoBackUp from '../../images/icons/expand-less.svg';
import BlorbBody from './blorb-body';

require('./style.less');

export default class LayerDetail extends Component {

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
        <BlorbBody blorbs={detailObj.blorbs} />
      </div>
    );
  }
}