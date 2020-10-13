import React, { Component } from 'react';
import Icon_Open from '../../images/icons/open-in-new.svg';

import LayerDetail from './layer-detail';

require('./style.less');

export default class Layer extends Component {
  renderDetails(detailsArray, reverseOrder){
    if(reverseOrder){
      return detailsArray.map((dt, idx) => (<LayerDetail key={idx} layerTitle={this.props.layerObj.title} detailObj={dt} skipToTop={this.props.scrollToIndex} />)).reverse();
    }else{
      return detailsArray.map((dt, idx) => (<LayerDetail key={idx} layerTitle={this.props.layerObj.title} detailObj={dt} skipToTop={this.props.scrollToIndex} />));
    }
  }


  renderListItem(item, idx){
    if(item.type === 'link'){
      return (
        <li className="layer-listitem-link" key={idx}>
          <a href={item.url} target="_blank">
            <p>{item.text}</p>
            <div className="icon-container">
              <Icon_Open />
            </div>
          </a>

        </li>
      )
    }else{
      return (
        <li className="layer-listitem" key={idx}>{item.text}</li>
      );
    }
  }

  renderListGroup(listGroup, idx){
    return (
      <div className="layer-listgroup" key={idx}>
        <h3>{listGroup.title}</h3>
        <ul>
          {listGroup.items.map((item, idx) => (
            this.renderListItem(item, idx)
          ))}
        </ul>
      </div>
    );
  }

  renderListGroups(listGroups){
    return listGroups.map((lg, idx) => this.renderListGroup(lg, idx));
  }

  renderLinkGroup(linkGroup, idx){
    return (
      <div className="layer-linkgroup" key={idx}>
        <h3>{linkGroup.title}</h3>
        <ul>
          {linkGroup.items.map((item, idx) => (
            <li key={idx}>
              <a href={item.url} target="_blank">{item.text}</a>
              <div className="icon-container">
                <Icon_Open />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  renderLinkGroups(linkGroups){
    return linkGroups.map((lg, idx) => this.renderLinkGroup(lg, idx));
  }


  renderLayerDescription(text){
    return (
      <div className="layer-title-text">
        <p>{text}</p>
      </div>
    );
  }

  render(){
    const { layerObj, region, scrollIndex, reverseOrder } = this.props;

    let className = 'layer';
    if(layerObj.theme){
      className += ' theme-' + layerObj.theme;
    }else{
      className += ' theme-' + this.props.region;
    }

    return (
      <section className={className} data-idx={scrollIndex} data-theme={layerObj.theme} >
        { reverseOrder && this.renderDetails(layerObj.details, reverseOrder)}
        <div className="layer-title layer-bubble">
          <h1>{layerObj.title}</h1>
          {layerObj.description && (<h2>{layerObj.description}</h2>)}
          {layerObj.date && (<h3>{layerObj.date}</h3>)}
          {layerObj.text && this.renderLayerDescription(layerObj.text)}
          {layerObj.linkGroups && this.renderLinkGroups(layerObj.linkGroups)}
          {layerObj.listGroups && this.renderListGroups(layerObj.listGroups)}
        </div>
        { !reverseOrder && this.renderDetails(layerObj.details, reverseOrder)}
      </section>
    );
  }
}