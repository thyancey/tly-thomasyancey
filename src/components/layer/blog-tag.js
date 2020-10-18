import React, { Component } from 'react';
require('./style.less');

export default class BlogTag extends Component {
  render(){
    const className = this.props.isActive ? 'blog-tag mod-active' : 'blog-tag';
    return (
      <li className={className}>
        <a onClick={() => this.props.onTagClicked(this.props.tag)}>{this.props.tag}</a>
      </li>
    );
  }
}