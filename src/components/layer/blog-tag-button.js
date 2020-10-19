import React, { Component } from 'react';
require('./style.less');

export default class BlogTagButton extends Component {
  render(){
    const className = this.props.isActive ? 'blog-tag-button mod-active' : 'blog-tag-button';
    return (
      <li className={className}>
        <a onClick={() => this.props.onTagClicked(this.props.tag)}>{this.props.tag}</a>
      </li>
    );
  }
}