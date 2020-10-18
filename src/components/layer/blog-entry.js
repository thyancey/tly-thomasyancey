import React, { Component } from 'react';
import LayerDetail from './layer-detail';
import BlorbBody from './blorb-body';
import BlogTag from './blog-tag';

require('./style.less');

export default class BlogEntry extends Component {
  render(){
    const { data, region, scrollIndex, currentTags} = this.props;

    let className = 'layer';
    if(data.theme){
      className += ' theme-' + data.theme;
    }else{
      className += ' theme-' + this.props.region;
    }

    return (
      <li className="layer-blog layer-bubble" data-idx={scrollIndex} data-theme={data.theme}>
        <div>
          <div className="blog-header">
            <div className="blog-title">
              <h1>{data.title}</h1>
              <p>{data.date}</p>
            </div>
            <ul className="blog-tags">
              { data.tags && data.tags.map((t,i) => (
                <BlogTag key={i} tag={t} isActive={currentTags.indexOf(t) > -1} onTagClicked={this.props.onTagClicked}/>
              ))}
            </ul>
          </div>
          <hr/>
          <BlorbBody blorbs={data.blorbs} />
        </div>
      </li>
    );
  }
}