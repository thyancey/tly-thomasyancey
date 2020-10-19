import React, { Component } from 'react';
require('./style.less');

export default class BlogTagLabel extends Component {
  render(){
    const className = this.props.isActive ? 'blog-tag-label mod-active' : 'blog-tag-label';
    return (
      <React.Fragment>
        <li className={className}>
          <a onClick={() => this.props.onTagClicked(this.props.tag)}>{this.props.tag}</a>
        </li>
      </React.Fragment>
    );
  }
}