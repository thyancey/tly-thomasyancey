import React, { Component } from 'react';

require('./style.less');

export default class ScrollCover extends Component {
  
  onScrollCoverClicked(regionMode){
    if(regionMode) this.props.toggleRegionMode(regionMode);
    this.props.onScrollButtonClick();
  }

  getButtonClassName(buttonMode){
    if(buttonMode === this.props.regionMode){
      return 'scrollcover-button mod-active';
    }else{
      return 'scrollcover-button';
    }
  }

  render() {
    const { links, active } = this.props;
    let className = 'scrollcover';
    if(active){
      className += ' mod-active';
    }

    if(links.length === 1){
      return(
        <div className={className}>
          <div className="scrollcover-button-container">
            <a className="scrollcover-button" onClick={e => this.onScrollCoverClicked()}>
              <h2>{links[0].label}</h2>
            </a>
          </div>
        </div>
      );
    }else{
      return(
        <div className={className}>
          <div className="scrollcover-button-container">
            {links.map((l, i) => (
              <a key={i} className={this.getButtonClassName(l.mode)} onClick={e => this.onScrollCoverClicked(l.mode)}>
                <h2>{l.label}</h2>
              </a>
            ))}
          </div>
        </div>
      );
    }
  }
}
