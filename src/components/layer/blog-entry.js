import React, { Component } from 'react';
import LayerDetail from './layer-detail';
import BlorbBody from './blorb-body';
import BlogTagLabel from './blog-tag-label';

require('./blog-style.less');

export default class BlogEntry extends Component {
  render(){
    const { data, region, scrollIndex, currentTags} = this.props;

    let className = 'layer';
    if(data.theme){
      className += ' theme-' + data.theme;
    }else{
      className += ' theme-' + region;
    }

    return (
      <li data-idx={scrollIndex} data-theme={data.theme}>
        <div className="layer-blog layer-bubble" >
          <div className="blog-header">
            <p className="blog-date">{data.date}</p>
            <div className="blog-title">
              <div className="blog-title-number">
                <span>{`#`}</span><span>{data.entry}</span>
              </div>
              <h1>{data.title}</h1>
            </div>
            <h4>{'Tags:'}</h4>
            <ul className="blog-tags">
              { data.tags && data.tags.map((t, i) => (
                <React.Fragment key={i} >
                  <BlogTagLabel tag={t} isActive={currentTags.indexOf(t) > -1} onTagClicked={this.props.onTagClicked}/>
                  {i !== data.tags.length - 1 && <li className={'blog-tag-divider'}>{' • '}</li>}
                </React.Fragment>
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