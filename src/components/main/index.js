import React, { Component } from 'react';

import { connect } from 'src/store';
import Layer from 'src/components/layer/index';
import NavBar from 'src/components/navbar';
import Butler from 'src/components/butler';

import Easing from 'src/utils/easing';

import { jobs as JobData } from 'src/data/data.js';

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
      currentRegion: 'middle'
    }
  }

  onScroll(e){
    console.log('-> on scroll');
    this.calcPosition();
  }

  componentDidUpdate(prevProps, prevState){
  }

  calcPosition(){
    const centerPoint = this.centerRegionEl.offsetTop - this.refs.element.scrollTop;
    const currentRegion = this.getRegionAtCurrrentScrollPosition(this.centerRegionEl.offsetTop, this.refs.element.scrollTop, global.innerHeight);
    
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

  startButlerTimer(){
    this.killButlerTimer();

    this.butlerTimer = global.setTimeout(() => {
      this.killButlerTimer();
      this.onButlerTimer();
    }, 1000);
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

  getRegionAtCurrrentScrollPosition(centerRegionY, scrollAmount, windowHeight){
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

  scrollToIndex(index, animate, center){
    try{
      const foundElement = document.querySelector(`[data-idx="${index}"]`);
      let offset = 0;
      if(center){
        offset = global.innerHeight / 2;
      }
      const scrollTarget = foundElement.getBoundingClientRect().y + this.refs.element.scrollTop  - offset;

      if(animate){
        this.startScrollInterval(this.refs.element.scrollTop, scrollTarget, 1000);
      }else{
        this.refs.element.scrollTop = scrollTarget;
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

    this.centerRegionEl = document.querySelector('#region-center');

    global.tester = this;
    this.scrollToIndex(0, false, true);
  }

  componentWillUnmount(){
    this.removeListeners();
  }

  onMiddleClick(e){
    this.scrollToIndex(0, true, true);
  }


  renderProjects(){
    // console.log("jobdata", JobData)
    const jobsList = [];

    let counter = 1;
    JobData.forEach((obj, idx) => {
      jobsList.push(<Layer key={'jb-' + idx} layerObj={obj} counter={counter} />);
      counter++;
    });

    return jobsList;
  }


  renderJobs(){
    // console.log("jobdata", JobData)
    const jobsList = [];

    let counter = -1;
    JobData.forEach((obj, idx) => {
      jobsList.push(<Layer key={'jb-' + idx} layerObj={obj} counter={counter}/>);
      counter--;
    });

    return jobsList;
  }


  render() {
    return(
      <div ref="element" className="main">
        <div id="region-top" className="region" >
          {this.renderProjects()}
          <Butler currentRegion={this.state.currentRegion} region="top" butlerType="topDragon" butlerHeight={this.state.butlerHeight} />
        </div>
        <div ref="element" id="region-center" className="region" data-idx="0" onClick={e => this.onMiddleClick(e)}>
          <NavBar currentRegion={this.state.currentRegion} />
        </div>
        <div id="region-bottom" className="region" >
          <Butler currentRegion={this.state.currentRegion} region="bottom" butlerType="bottomTree" butlerHeight={this.state.butlerHeight} />
          {this.renderJobs()}
        </div>
      </div>
    );
  }
}

export default connect(state => ({ 
  loaded: state.loaded,
  curLayerIdx: state.curLayerIdx
}))(Main);
