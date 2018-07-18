import React, { Component } from 'react';

import { connect } from 'src/store';
require('./style.less');

class NavBar extends Component {

  render() {
    return (
      <div className="nav-bar">
        <div className="nav-bar-text">
          <h1>{'Tom Yancey'}</h1>
          <h2>{'Interactive Developer'}</h2>
        </div>
        <div className="nav-bar-slide mod-top"/>
        <div className="nav-bar-slide mod-bottom"/>
      </div>
    );
  }
}

export default connect(state => ({ 
}))(NavBar);
