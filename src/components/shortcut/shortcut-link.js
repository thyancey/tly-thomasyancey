import React, { Component } from 'react';

require('./style.less');

export default class ShortcutLink extends Component {
  render() {
    const { idx, isCurrent, type } = this.props;
    let className = 'shortcut-link';
    className += ' mod-' + type;
    if(isCurrent){
      className += ' mod-active';
    }

    return(
      <div className={className} onClick={this.props.onShortcutClick}>

      </div>
    )
  }
}
