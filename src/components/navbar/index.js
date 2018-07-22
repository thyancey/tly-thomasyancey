import React, { Component } from 'react';

import MenuLinkContainer from 'src/components/menulink/menulink-container';

require('./style.less');

export default class NavBar extends Component {
  constructor(){
    super();

    this.element = React.createRef();
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
