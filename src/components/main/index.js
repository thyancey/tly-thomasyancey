import React, { Component } from 'react';

import { connect } from 'src/store';
import Layer from 'src/components/layer/index';
import LayerDivider from 'src/components/layer/layer-divider';
import BlogEntry from 'src/components/layer/blog-entry';
import BlogTagMenu from 'src/components/layer/blog-tag-menu';
import NavBar from 'src/components/navbar';
import Butler from 'src/components/butler';

import ScrollCover from 'src/components/scrollcover';
import Easing from 'src/utils/easing';

import DataBoss from 'src/utils/databoss';

import { getFilteredBlogPosts } from 'src/utils/blog-utils';

require('./style.less');

const SCROLL_INTERVAL_FRAMERATE = 25;

// global.PJ = ProjectData;
global.DataBoss = DataBoss;

class Main extends Component {
  constructor(){
    super();

    this.onScrollHandler = e => {
      this.onScroll(e);
    }
    this.onResizeHandler = e => {
      this.onResize(e);
    }

    this.scrollInterval = null;
    this.scrollIntervalDuration = -1;
    this.scrollIntervalEnd = -1;
    this.scrollTarget = -1;
    this.ref_main = React.createRef();
    this.ref_middle = React.createRef();

    this.state = {
      currentRegion: 'middle',
      loaded: false,
      imagesLoaded: false
    }
  }

  onScroll(e){
    // console.log('-> on scroll');
    this.calcPosition();
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.loaded && prevState.loaded !== this.state.loaded){
      this.onLoadedChanged();
    }

    
    if(prevProps.targetLayerIdx !== this.props.targetLayerIdx && this.props.targetLayerIdx !== -1){
    // if(this.state.loaded && this.props.targetLayerIdx){
      if(this.props.targetLayerIdx === 'middle'){
        this.scrollToIndex(this.props.targetLayerIdx, false, true);
      }else{
        this.scrollToIndex(this.props.targetLayerIdx, false, false);
      }
    }
  }

  calcPosition(){
    const centerPoint = this.centerRegionEl.offsetTop - this.ref_main.current.scrollTop;
    const currentRegion = this.getRegionAtCurrentScrollPosition(this.centerRegionEl.offsetTop, this.ref_main.current.scrollTop, global.innerHeight);
    const currentLayerObj = this.getLayerAtCurrentScrollPosition(currentRegion, this.centerRegionEl.offsetTop, this.ref_main.current.scrollTop, global.innerHeight);

    if(currentLayerObj && currentLayerObj.idx !== this.props.curLayerIdx){
      this.props.actions.setCurrentLayer(currentLayerObj);
    }

    this.startButlerTimer();

    if(this.state.currentRegion !== currentRegion){
      this.setState({ currentRegion: currentRegion });
    }
  }

  startScrollInterval(startPosition, target, duration){
    this.scrollStart = startPosition;
    this.scrollTarget = target;
    this.scrollIntervalStart = new Date().getTime();
    this.scrollIntervalDuration = duration;

    this.killScrollInterval();
    this.scrollInterval = global.setInterval(() => {
      this.onScrollInterval();
    }, SCROLL_INTERVAL_FRAMERATE);
  }

  killScrollInterval(){
    if(this.scrollInterval){
      global.clearInterval(this.scrollInterval);
      this.scrollInterval = null;
    }
  }

  onScrollInterval(){
    const now = new Date().getTime();
    const scrollProgress = (now - this.scrollIntervalStart) / this.scrollIntervalDuration;
    this.scrollToValue(this.scrollTarget, this.scrollStart, scrollProgress);

    if(scrollProgress >= 1){
      this.killScrollInterval();
    }
  }

  scrollToValue(targetValue, startValue, progress){
    this.ref_main.current.scrollTop = ((targetValue - startValue) * Easing.easeInOutQuad(progress)) + startValue;
  }

  startButlerTimer(){
    this.killButlerTimer();

    this.butlerTimer = global.setTimeout(() => {
      this.killButlerTimer();
      this.onButlerTimer();
    }, 500);
  }

  killButlerTimer(){
    if(this.butlerTimer){
      global.clearTimeout(this.butlerTimer);
      this.butlerTimer = null;
    }
  }

  onButlerTimer(){
    const centerPoint = this.centerRegionEl.offsetTop - this.ref_main.current.scrollTop;
    const butlerHeight = this.getButlerHeightAtScrollPosition(this.centerRegionEl.offsetTop, this.ref_main.current.scrollTop, global.innerHeight, true);

    this.setState({ butlerHeight: butlerHeight });
  }

  getButlerHeightAtScrollPosition(centerRegionY, scrollAmount, windowHeight, doRandomize){
    let randomizer = 0;
    if(this.state.currentRegion === 'bottom'){
      if(doRandomize) randomizer = Math.random() * (windowHeight / 3);
      return scrollAmount - centerRegionY + windowHeight - randomizer;
    }else{
      if(doRandomize) randomizer = Math.random() * (windowHeight / 2);
      return centerRegionY - scrollAmount - randomizer;
    }
  }

  getLayerAtCurrentScrollPosition(region, centerRegionY, scrollAmount, windowHeight){
    if(region === 'middle'){
      return {
        idx: 'middle',
        theme: 'middle'
      }
    }else{
      const regionLayers = Array.from(document.querySelectorAll(`#region-${region} .layer`));

      let centerScreen = scrollAmount + (windowHeight / 2);
      if(centerScreen > centerRegionY){
        centerScreen = centerScreen - centerRegionY;
      }

      for(let i = regionLayers.length - 1; i >= 0; i--){
        if(centerScreen > regionLayers[i].offsetTop){
          return {
            idx: regionLayers[i].dataset.idx,
            theme: regionLayers[i].dataset.theme,
            title: this.getTitleFromIndex(+regionLayers[i].dataset.idx.split('-')[1], region)
          }
        }
      }

      return null;
    }
  }


  getRegionAtCurrentScrollPosition(centerRegionY, scrollAmount, windowHeight){
    const centerPoint = centerRegionY - scrollAmount;

    //- numbers below would be 0, but they help snap it in more naturally than dead center.
    if(centerPoint < 100){
      return 'bottom';
    }else if((centerPoint - windowHeight) > -200){
      return 'top';
    }else{
      return 'middle';
    }
  }

  onResize(e){
    // console.log('onResize', e);
    this.calcPosition();
  }

  scrollToIndex(index, skipAnimation, center){
    // console.log('scrollToIndex', index, skipAnimation, center);
    try{
      const foundElement = document.querySelector(`[data-idx="${index}"] .layer-title`) || document.querySelector(`[data-idx="${index}"]`);
      let offset = 0;
      if(center){
        offset = global.innerHeight / 2;
      }
      let scrollTarget = foundElement.getBoundingClientRect().y + this.ref_main.current.scrollTop  - offset;

      //- these elements have a 50px margin above them, this helps frame them correctly when jumping to them
      if(index.indexOf('top') > -1){
        scrollTarget -= 20;
      }else if(index.indexOf('bottom') > -1){
        scrollTarget -= 180;
      }

      this.props.actions.setTargetLayerIdx(-1);

      if(skipAnimation){
        this.ref_main.current.scrollTop = scrollTarget;
      }else{
        this.startScrollInterval(this.ref_main.current.scrollTop, scrollTarget, 1000);
      }
    }catch(e){
      console.error('could not scroll to index ' + index, e);
    }

  }

  addListeners(){
    this.ref_main.current.addEventListener('scroll', this.onScrollHandler);
    global.addEventListener('resize', this.onResizeHandler);
  }

  removeListeners(){
    this.ref_main.current.removeEventListener('scroll', this.onScrollHandler);
    global.removeEventListener('resize', this.onResizeHandler);
  }

  setAllTags(){
    let allTags = {};
    DataBoss.getData('blogs').forEach(b => {
      b.tags && b.tags.forEach(t => {
        if(!allTags[t]){
          allTags[t] = {
            id: t,
            count: 1 
          }
        }else{
          allTags[t].count++;
        }
      });
    });

    this.props.actions.setAllTags(allTags);
  }

  componentDidMount(){
    this.addListeners();

    this.centerRegionEl = document.querySelector('#region-middle');

    DataBoss.loadData(() => this.onDataBossDataComplete());
  }

  onDataBossDataComplete(){

    this.setState({ 
      loaded: true
      // loadedPercent: 100
    });

    //- cause height needs to be recalculated after all the images load in
    DataBoss.loadImages(() => this.onDataBossImagesComplete());
  }

  onDataBossImagesComplete(){
    
    this.setState({ 
      imagesLoaded: true
      // loadedPercent: 100
    });

    console.log('load complete.');
    this.scrollToIndex('middle', true, true);
  }

  onLoadedChanged(){
    this.setAllTags();
  }

  componentWillUnmount(){
    this.removeListeners();
  }

  onMiddleClick(e){
    // console.log('on middleclick')
    this.scrollToIndex('middle', false, true);
  }

  getTitleFromIndex(idx, region){
    if(region === 'top'){
      return DataBoss.getData('projects', idx).title;
    }else if(region === 'bottom'){
      return DataBoss.getData('jobs', idx).title;
    }else{
      return 'No title';
    }
  }

  renderBlog(blogDataArray, currentTags, region){
    return (
      <div className="blog-area">
        { this.state.currentRegion === region && (
          <BlogTagMenu 
            allTags={this.props.allTags}
            currentTags={this.props.currentTags} 
            onTagClicked={this.props.actions.toggleTag} />
        ) }
        <ul className="blog-posts">
          { blogDataArray.map((b, i) => (
            <BlogEntry 
              key={i}
              data={b} 
              region={region} 
              scrollIndex={`${region}-${i}`}
              scrollToIndex={() => this.scrollToIndex(scrollIndex)}
              currentTags={currentTags}
              onTagClicked={this.props.actions.toggleTag} />
          )) }
        </ul>
      </div>
    )
  }

  renderLayers(layerDataArray, region, reverseOrder){
    const layerList = [];

    layerDataArray.forEach((obj, i) => {
      let idx = i;
      const scrollIndex = `${region}-${idx}`;

      if(!reverseOrder){
        layerList.push(<Layer key={idx} 
                              layerObj={obj} 
                              region={region} 
                              scrollIndex={scrollIndex}
                              scrollToIndex={() => this.scrollToIndex(scrollIndex)} 
                              reverseOrder={reverseOrder} />);
        if(idx !== layerDataArray.length - 1){
          layerList.push(<LayerDivider key={'d-' + idx} theme={obj.dividerTheme} region={region} />);
        }
      }else{
        if(idx !== 0){
          layerList.unshift(<LayerDivider key={'d-' + idx} theme={obj.dividerTheme} region={region} />);
        }
        layerList.unshift(<Layer  key={idx} 
                                  layerObj={obj} 
                                  region={region} 
                                  scrollIndex={scrollIndex}
                                  scrollToIndex={() => this.scrollToIndex(scrollIndex)} 
                                  reverseOrder={reverseOrder}/>);
      }
    });

    return layerList;
  }

  renderLoader(){
    return(
      <div id="loader" className={this.state.imagesLoaded ? 'mod-loading' : null }>
        <img src={require('images/loader/blobloader.gif')} alt={"thomasyancey.com is loading"} />
      </div>
    );
  }

  render() {
    const layerTheme = (this.state.currentRegion === 'bottom' && this.props.bottomRegionMode === 'blog') ? 'blog' : this.props.curLayerTheme
    let className = `main theme-${layerTheme} curregion-${this.state.currentRegion}`;
    global.Main = this;

    return(
      <div ref={this.ref_main} className={className}>
        {this.renderLoader()}
        <div id="region-top" className="region" >
          {this.renderLayers(DataBoss.getData('projects'), 'top', true)}
          <h2>{'SCROLL UP!'}</h2>
          <Butler currentRegion={this.state.currentRegion} 
                  region="top" 
                  butlerType="topDragon" 
                  butlerHeight={this.state.butlerHeight} />
          <ScrollCover 
            type="top" 
            links={[{ label:'projects' }]} 
            active={this.state.currentRegion === 'middle'} 
            regionMode={this.props.bottomRegionMode}
            toggleRegionMode={mode => this.props.actions.toggleRegionMode('top', mode)}
            onScrollButtonClick={e => this.scrollToIndex('top-0')} />
        </div>
        <div ref={this.ref_middle} id="region-middle" className="region" data-idx={'middle'} onClick={e => this.onMiddleClick(e)}>
          <NavBar 
            currentRegion={this.state.currentRegion} 
            curLayerTitle={this.state.currentRegion === 'top' && this.props.curLayerTitle}  />
        </div>
        <div id="region-bottom" className="region" >
          {this.props.bottomRegionMode === 'job' ? (
            <React.Fragment>
              <Butler currentRegion={this.state.currentRegion} 
                      region="bottom" 
                      butlerType="bottomTree" 
                      butlerHeight={this.state.butlerHeight}/>
              {this.renderLayers(DataBoss.getData('jobs'), 'bottom')}
              <ScrollCover 
                type="bottom" 
                links={[{ label: 'blog', mode: 'blog' }, { label:'career', mode: 'job' }]} 
                active={this.state.currentRegion === 'middle'}
                regionMode={this.props.bottomRegionMode}
                toggleRegionMode={mode => this.props.actions.toggleRegionMode('bottom', mode)}
                onScrollButtonClick={e => this.scrollToIndex('bottom-0')} />
            </React.Fragment>
          ):(
            <React.Fragment>
              {this.renderBlog(this.props.filteredBlogPosts, this.props.currentTags, 'bottom')}
              <ScrollCover 
                type="bottom" 
                links={[{ label: 'blog', mode: 'blog' }, { label:'career', mode: 'job' }]} 
                active={this.state.currentRegion === 'middle'}
                regionMode={this.props.bottomRegionMode}
                toggleRegionMode={mode => this.props.actions.toggleRegionMode('bottom', mode)}
                onScrollButtonClick={e => this.scrollToIndex('bottom-0')} />
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default connect(state => ({ 
  bottomRegionMode: state.bottomRegionMode,
  curLayerIdx: state.curLayerIdx,
  curLayerTheme: state.curLayerTheme,
  curLayerTitle: state.curLayerTitle,
  targetLayerIdx: state.targetLayerIdx,
  currentTags: state.currentTags,
  allTags: state.allTags,
  filteredBlogPosts: getFilteredBlogPosts(DataBoss.getData('blogs'), state.currentTags)
}))(Main);
