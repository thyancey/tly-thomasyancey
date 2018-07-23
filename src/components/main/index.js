import React, { Component } from 'react';

import { connect } from 'src/store';
import Layer from 'src/components/layer/index';
import LayerDivider from 'src/components/layer/layer-divider';
import NavBar from 'src/components/navbar';
import Butler from 'src/components/butler';

import ScrollCover from 'src/components/scrollcover';
import Easing from 'src/utils/easing';

import { jobs as JobData, projects as ProjectData } from 'src/data/data.js';

// const RevProjectData = ProjectData.reverse();
require('./style.less');

const SCROLL_INTERVAL_FRAMERATE = 25;

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

    this.state = {
      currentRegion: 'middle',
      loaded: false
    }
  }

  onScroll(e){
    // console.log('-> on scroll');
    this.calcPosition();
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.loaded && prevState.loaded !== this.state.loaded){
      this.onLoaded();
    }
    if(prevProps.targetLayerIdx !== this.props.targetLayerIdx){
      if(this.props.targetLayerIdx === 'middle'){
        this.scrollToIndex(this.props.targetLayerIdx, false, true);
      }else{
        this.scrollToIndex(this.props.targetLayerIdx, false, false);
      }
    }
  }

  calcPosition(){
    const centerPoint = this.centerRegionEl.offsetTop - this.refs.element.scrollTop;
    const currentRegion = this.getRegionAtCurrentScrollPosition(this.centerRegionEl.offsetTop, this.refs.element.scrollTop, global.innerHeight);
    const currentLayerObj = this.getLayerAtCurrentScrollPosition(currentRegion, this.centerRegionEl.offsetTop, this.refs.element.scrollTop, global.innerHeight);
    // console.log('currentLayer:', currentLayerObj.idx);

    if(currentLayerObj){
      this.props.actions.setCurrentLayerIdx(currentLayerObj.idx);
      this.props.actions.setCurrentLayerTheme(currentLayerObj.theme);
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
    this.refs.element.scrollTop = ((targetValue - startValue) * Easing.easeInOutQuad(progress)) + startValue;
  }



  killLoadTimeout(){
    if(this.loadTimeout){
      global.clearTimeout(this.loadTimeout);
      this.loadTimeout = null;
    }
  }

  startLoadTimeout(){
    this.killLoadTimeout();

    this.loadTimeout = global.setTimeout(() => {
      this.onLoadTimeout();
    }, 50)
  }

  onLoadTimeout(){
    // console.log('onLoadTimeout')
    this.killLoadTimeout();

    // const loadedPercent = 50;
    const images = Array.from(document.querySelectorAll('img'));
    const loadedImages = images.filter((i, idx) => (i.complete));
    const loadedPercent = Math.round((loadedImages.length / images.length) * 100);

    // console.log(`${loadedImages.length}/${images.length} loaded`);
    if(loadedPercent === 100){
      this.setState({ 
        loaded: true,
        loadedPercent: 100
      });
    }else{
      this.setState({ loadedPercent: loadedPercent });
      this.startLoadTimeout();
    }
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
    const centerPoint = this.centerRegionEl.offsetTop - this.refs.element.scrollTop;
    const butlerHeight = this.getButlerHeightAtScrollPosition(this.centerRegionEl.offsetTop, this.refs.element.scrollTop, global.innerHeight, true);

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
            theme: regionLayers[i].dataset.theme
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
    }else if((centerPoint - windowHeight) > 20){
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
      const foundElement = document.querySelector(`[data-idx="${index}"]`);
      let offset = 0;
      if(center){
        offset = global.innerHeight / 2;
      }
      const scrollTarget = foundElement.getBoundingClientRect().y + this.refs.element.scrollTop  - offset;

      if(skipAnimation){
        this.refs.element.scrollTop = scrollTarget;
      }else{
        this.startScrollInterval(this.refs.element.scrollTop, scrollTarget, 1000);
      }
    }catch(e){
      console.error('could not scroll to index ' + index, e);
    }

  }

  addListeners(){
    this.refs.element.addEventListener('scroll', this.onScrollHandler);
    global.addEventListener('resize', this.onResizeHandler);
  }

  removeListeners(){
    this.refs.element.removeEventListener('scroll', this.onScrollHandler);
    global.removeEventListener('resize', this.onResizeHandler);
  }

  componentDidMount(){
    this.addListeners();

    this.centerRegionEl = document.querySelector('#region-middle');

    this.startLoadTimeout();

    //- TODO, make a loader instead
    // window.setTimeout(e => {
    //   this.scrollToIndex('middle', true, true);
    // }, 50);
  }

  onLoaded(){
    console.log('onLoaded!')
    this.scrollToIndex('middle', true, true);
  }

  componentWillUnmount(){
    this.removeListeners();
    this.killLoadTimeout();
  }

  onMiddleClick(e){
    this.scrollToIndex('middle', false, true);
  }


  renderLayers(layerDataArray, region, reverseOrder){
    const layerList = [];

    layerDataArray.forEach((obj, i) => {
      let idx = i;

      if(!reverseOrder){
        layerList.push(<Layer key={idx} layerObj={obj} region={region} counter={idx}/>);
        if(idx !== layerDataArray.length - 1){
          layerList.push(<LayerDivider key={'d-' + idx} theme={obj.dividerTheme} region={region} />);
        }
      }else{
        if(idx !== 0){
          layerList.unshift(<LayerDivider key={'d-' + idx} theme={obj.dividerTheme} region={region} />);
        }
        layerList.unshift(<Layer key={idx} layerObj={obj} region={region} counter={idx}/>);
      }
    });

    return layerList;
  }

  renderLoader(){
    // console.log('loaded: ', this.state.loaded)
    if(!this.state.loaded){
      return(
        <div id="loader">
          <img src={require('images/loader/blobloader.gif')} alt={"thomasyancey.com is loading"} />
        </div>
      );
    }else{
      return null;
    }
  }


  render() {
    let className = `main theme-${this.props.curLayerTheme}`;

    return(
      <div ref="element" className={className}>
        {this.renderLoader()}
        <div id="region-top" className="region" >
          {this.renderLayers(ProjectData, 'top', true)}
          <Butler currentRegion={this.state.currentRegion} 
                  region="top" 
                  butlerType="topDragon" 
                  butlerHeight={this.state.butlerHeight} />
          <ScrollCover type="top" active={this.state.currentRegion === 'middle'} onScrollButtonClick={e => this.scrollToIndex('top-0')} />
        </div>
        <div ref="element" id="region-middle" className="region" data-idx={'middle'} onClick={e => this.onMiddleClick(e)}>
          <NavBar currentRegion={this.state.currentRegion} />
        </div>
        <div id="region-bottom" className="region" >
          <Butler currentRegion={this.state.currentRegion} 
                  region="bottom" 
                  butlerType="bottomTree" 
                  butlerHeight={this.state.butlerHeight}/>
          {this.renderLayers(JobData, 'bottom')}
          <ScrollCover type="bottom" active={this.state.currentRegion === 'middle'} onScrollButtonClick={e => this.scrollToIndex('bottom-0')} />
        </div>
      </div>
    );
  }
}

export default connect(state => ({ 
  curLayerIdx: state.curLayerIdx,
  curLayerTheme: state.curLayerTheme,
  targetLayerIdx: state.targetLayerIdx
}))(Main);
