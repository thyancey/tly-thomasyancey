import React, { Component } from 'react';

import { connect } from 'src/store';
import Layer from 'src/components/layer/index';
import NavBar from 'src/components/navbar';
import Butler from 'src/components/butler';

import { jobs as JobData } from 'src/data/data.js';

require('./style.less');

class Main extends Component {
  constructor(){
    super();

    this.onScrollHandler = e => {
      this.onScroll(e);
    }
    this.onResizeHandler = e => {
      this.onResize(e);
    }

    this.state = {
      currentRegion: 'middle'
    }
  }

  onScroll(e){
    console.log('-> on scroll')
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
  }

  componentWillUnmount(){
    this.removeListeners();
  }



  renderJobs(){
    // console.log("jobdata", JobData)
    const jobsList = [];

    JobData.forEach((obj, idx) => {
      jobsList.push(<Layer key={'jb-' + idx} layerObj={obj} />);
    });

    return jobsList;
  }


  render() {
    return(
      <div ref="element" className="main">
        <div id="region-top" className="region" >
          {this.renderJobs()}
          <Butler currentRegion={this.state.currentRegion} region="top" butlerType="topDragon" butlerHeight={this.state.butlerHeight} />
        </div>
        <div ref="element" id="region-center" className="region">
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
