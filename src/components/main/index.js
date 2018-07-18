import React, { Component } from 'react';

import { connect } from 'src/store';
import Layer from 'src/components/layer/index';
import NavBar from 'src/components/navbar';

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
    // console.log('onScroll', e);
    this.calcPosition();
  }

  componentDidUpdate(prevProps, prevState){
  }

  calcPosition(){
    const centerPoint = this.centerRegionEl.offsetTop - this.refs.element.scrollTop;
    const currentRegion = this.getRegionAtCurrrentScrollPosition(centerPoint, global.innerHeight);
    if(this.state.currentRegion !== currentRegion){
      this.setState({ currentRegion: currentRegion });
    }
  }

  getRegionAtCurrrentScrollPosition(centerPoint, windowHeight){
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
        </div>
        <div ref="element" id="region-center" className="region">
          <NavBar currentRegion={this.state.currentRegion} />
        </div>
        <div id="region-bottom" className="region" >
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
