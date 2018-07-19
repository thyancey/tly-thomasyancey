import React, { Component } from 'react';

import { connect } from 'src/store';
require('./style.less');

class ShortCut extends Component {
  constructor(){
    super();
  }


  render() {
    return(
      <div id="shortcut-container">

      </div>
    )
  }
}

export default connect(state => ({ 
}))(ShortCut);
