import React, { Component } from 'react';
import Icon_Email from '../../images/icons/email.svg';
import Icon_GitHub from '../../images/icons/octicon-code.svg';
import Icon_LinkedIn from '../../images/icons/linkedin.svg';

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
          { this.props.curLayerTitle ? (
            <React.Fragment>
              <h1>{this.props.curLayerTitle}</h1>
              <h2>{'thomasyancey.com'}</h2>
            </React.Fragment>
          ): (
            <React.Fragment>
              <h1>{'Tom Yancey'}</h1>
              <h2>{'Interactive Developer'}</h2>
            </React.Fragment>
          )}
          <div className="nav-bar-buttons">
            <a className="nav-bar-button" title="email me" href="mailto:thyancey@gmail.com" target="_blank">
              <Icon_Email />
            </a>
            <a className="nav-bar-button" title="my GitHub" href="https://github.com/thyancey" target="_blank">
              <Icon_GitHub />
            </a>
            {/*
            <a className="nav-bar-button mod-linkedin" title="my LinkedIn" href="https://www.linkedin.com/in/tom-yancey" target="_blank">
              <Icon_LinkedIn />
            </a>
            */}
          </div>
        </div>
        <div className="nav-bar-slide mod-top"/>
        <div className="nav-bar-slide mod-bottom"/>
        <MenuLinkContainer curRegion={this.props.currentRegion} />
      </div>
    );
  }
}
