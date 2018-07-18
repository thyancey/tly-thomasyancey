import React, { Component } from 'react';

import { connect } from 'src/store';
import NavBar from 'src/components/navbar';
import Layer from 'src/components/layer/index';
// import ItemDivider from 'src/components/sections/navbuffer';

import { jobs as JobData } from 'src/data/data.js';

require('./style.less');

class Main extends Component {


  renderJobs(){
    console.log("jobdata", JobData)
    const jobsList = [];
    const windowHeight = window.innerHeight || null;
    const instance = this;

    JobData.forEach((obj, idx) => {
      jobsList.push(<Layer key={'jb-' + idx} layerObj={obj} height={windowHeight} setLayerIdx={this.props.actions.setLayerIdx}/>);
    });

    return jobsList;
  }


  componentDidMount(){
  }



  render() {
    return(
      <div className="main">
        <div id="region-top" className="region" >
          {this.renderJobs()}
        </div>
        <div id="region-center" className="region" >
          <NavBar tags={this.props.tags} onSetTag={this.onSetTag}/>
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
