import React, { Component } from 'react';
import BlogTagButton from './blog-tag-button';

require('./style.less');

export default class BlogTagMenu extends Component {
  render(){
    const { allTags, currentTags } = this.props;

    return (
      <div className="blog-tag-menu" >
        <h2>{'Tags:'}</h2>
        <ul>
          { allTags && allTags.map((t,i) => (
            <BlogTagButton key={i} tag={t} isActive={currentTags.indexOf(t) > -1} onTagClicked={this.props.onTagClicked}/>
          ))}
        </ul>
      </div>
    );
  }
}