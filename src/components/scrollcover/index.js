import React, { Component } from 'react';

require('./style.less');

export default class ScrollCover extends Component {

  render() {
    let className = 'scrollcover';
    if(this.props.active){
      className += ' mod-active';
    }

    return(
      <div className={className}>
        <a className="scrollcover-button" onClick={this.props.onScrollButtonClick}>
          <h2>{this.props.label}</h2>
        </a>
      </div>
    );
  }
}
