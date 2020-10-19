import React, { Component } from 'react';
require('./style.less');

export default class BlogTagButton extends Component {
  render(){
    const className = this.props.isActive ? 'blog-tag-button mod-active' : 'blog-tag-button';
    return (
      <li className={className}>
        <a onClick={() => this.props.onTagClicked(this.props.tag.id)}>{this.props.tag.id}</a>
        <span>{`  ( ${this.props.tag.count} )`}</span>
      </li>
    );
  }
}