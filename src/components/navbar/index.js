import React, { Component } from 'react';

import MenuLinkContainer from 'src/components/menulink/menulink-container';

import { connect } from 'src/store';
require('./style.less');

class NavBar extends Component {
  constructor(){
    super();

    this.element = React.createRef();
  }

  relayPosition(){
    console.log('RELAY!');
    console.log(this.element);
    global.gNavbar = this.element;
  }

  render() {
    let className = 'nav-bar';
    switch(this.props.currentRegion){
      case 'top': className += ' position-bottom';
        break;
      case 'middle': className += ' position-floating';
        break;
      case 'bottom': className += ' position-top';
        break;
    }

    return (
      <div className={className} ref={this.element}>
        <div className="nav-bar-text">
          <h1>{'Tom Yancey'}</h1>
          <h2>{'Interactive Developer'}</h2>
        </div>
        <div className="nav-bar-slide mod-top"/>
        <div className="nav-bar-slide mod-bottom"/>
        <MenuLinkContainer curRegion={this.props.currentRegion} />
      </div>
    );
  }
}

export default connect(state => ({ 
}))(NavBar);
