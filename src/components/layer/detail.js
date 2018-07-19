import React, { Component } from 'react';

require('./style.less');

export default class Detail extends Component {
  render(){
    const { detailObj } = this.props;

    let className = 'layer-detail layer-bubble';
    if(detailObj.images && detailObj.images.length === 1){
      className += ' mod-singleimage';
    }


    return (
      <div className={className}>
        <div className="layer-detail-headers">
          <h2>{detailObj.title}</h2>
          <h3>{detailObj.description}</h3>
        </div>
        <div className="layer-detail-text">
          <p>{detailObj.text}</p>
        </div>
        {detailObj.images && detailObj.images.length > 0 ? (
          <div className="layer-detail-images">
            {detailObj.images.map((imgUrl, idx) => (
              <div key={idx} className="layer-detail-image">
                <img src={require('src/images/layers/' + imgUrl)}/>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}