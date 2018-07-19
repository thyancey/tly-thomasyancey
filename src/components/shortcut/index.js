import React, { Component } from 'react';

import { connect } from 'src/store';

import ShortcutLink from './shortcut-link';
require('./style.less');

class ShortCut extends Component {
  constructor(){
    super();
  }

  onShortcutClick(idx){
    // console.log('onShortcutClick(' + idx + ')');
    this.props.actions.setLayerIdx(idx);
  }

  renderMiddleShortcut(idx, curIdx){
    return (
        <ShortcutLink idx={idx} 
                      isCurrent={curIdx === idx}
                      type={'middle'}
                      onShortcutClick={e => this.onShortcutClick(idx)}>
          {idx}
        </ShortcutLink>
    );
  }

  renderShortcuts(type, firstIdx, lastIdx, curIdx){
    const retVal = [];
    for(let i = firstIdx; i <= lastIdx; i++){
      console.log('thats one')
      retVal.push(
        <ShortcutLink idx={i} 
                      key={i} 
                      isCurrent={curIdx === i}
                      type={type}
                      onShortcutClick={e => this.onShortcutClick(i)}>
          {i}
        </ShortcutLink>
      );
    }

    return retVal;
  }

  render() {
    const { topFirstIdx, topLastIdx, middleIdx, bottomFirstIdx, bottomLastIdx } = this.props;
    return(
      <div id="shortcut-container">
        <ul>
          {this.renderShortcuts('top', topFirstIdx, topLastIdx, this.props.curLayerIdx)}
          {this.renderMiddleShortcut(middleIdx, this.props.curLayerIdx)}
          {this.renderShortcuts('bottom', bottomFirstIdx, bottomLastIdx, this.props.curLayerIdx)}
        </ul>
      </div>
    )
  }
}

export default connect(state => ({ 
  curLayerIdx: state.curLayerIdx
}))(ShortCut);
