import React, { Component } from 'react';

require('./style.less');

export default class Butler extends Component {
  constructor(){
    super();

    this.state = {
      butlerHeight: .5
    }
  }

  render() {
    let className = 'butler ' + this.props.butlerType;

    let butlerHeight = 0
    if(this.props.currentRegion === this.props.region){
      butlerHeight = this.props.butlerHeight;
    }
    if(this.props.currentRegion === 'top' && this.props.region === 'bottom' ||
       this.props.currentRegion === 'bottom' && this.props.region === 'top'){
      className += ' hidden';
    }

    if(this.props.region === 'top'){
      return (
        <div className={className} style={{ height:butlerHeight }}>
          <div className="butler-head"/>
          <div className="butler-body"/>
        </div>
      );
    }else{
      return (
        <div className={className} style={{height:butlerHeight}}>
          <div className="butler-body" />
          <div className="butler-head"/>
        </div>
      );
    }

  }
}