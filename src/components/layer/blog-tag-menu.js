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
          { allTags && Object.keys(allTags).map((t,i) => (
            <React.Fragment key={i} >
              <BlogTagButton tag={allTags[t]} isActive={currentTags.indexOf(allTags[t].id) > -1} onTagClicked={this.props.onTagClicked}/>
              <li className={'blog-tag-divider'}>{' • '}</li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    );
  }
}