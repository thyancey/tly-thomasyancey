import React, { Component } from 'react';

require('./style.less');

export default class ScrollCover extends Component {

  render() {
    let className = 'scrollcover';
    if(this.props.active){
      className += ' mod-active';
    }

    let buttonText;
    if(this.props.type === 'top'){
      buttonText = 'projects';
    }else{
      buttonText = 'career';
    }

    return(
      <div className={className}>
        <a className="scrollcover-button" onClick={this.props.onScrollButtonClick}>
          <h2>{buttonText}</h2>
        </a>
      </div>
    );
  }
}
