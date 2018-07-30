import { initStore } from 'react-waterfall';

const store = {
  initialState: {
    loaded:false,
    targetLayerIdx:-1,
    curLayerIdx:-1,
    curLayerTheme:'default'
  },
  actions: {
    toggleLoaded: ({ loaded }) => ({ loaded: !loaded }),
    setTargetLayerIdx: ({targetLayerIdx}, newLayerIdx) => ({targetLayerIdx: newLayerIdx}),
    setCurrentLayerIdx: ({curLayerIdx}, newLayerIdx) => ({curLayerIdx: newLayerIdx}),
    setCurrentLayerTheme: ({curLayerTheme}, newLayerTheme) => ({curLayerTheme: newLayerTheme || 'default'})
  }
};
 
export const { Provider, connect } = initStore(store);