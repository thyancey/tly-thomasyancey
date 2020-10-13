import { initStore } from 'react-waterfall';

const store = {
  initialState: {
    loaded:false,
    targetLayerIdx:-1,
    curLayerIdx:-1,
    curLayerTheme:'default',
    curLayerTitle:'not set'
  },
  actions: {
    toggleLoaded: ({ loaded }) => ({ loaded: !loaded }),
    setTargetLayerIdx: ({targetLayerIdx}, newLayerIdx) => ({targetLayerIdx: newLayerIdx}),
    setCurrentLayer: ({curLayerIdx,curLayerTheme,curLayerTitle}, newLayerObj) => ({
      curLayerIdx: newLayerObj.idx,
      curLayerTheme: newLayerObj.theme || 'default',
      curLayerTitle: newLayerObj.title
    })
  }
};
 
export const { Provider, connect } = initStore(store);