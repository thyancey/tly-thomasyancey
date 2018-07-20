import { initStore } from 'react-waterfall';

const store = {
  initialState: {
    loaded:false,
    targetLayerIdx:-1,
    curLayerIdx:-1,
    curLayerTheme:'default',
    scrollPosition:'middle',
    scrollTargetIdx:-1
  },
  actions: {
    toggleLoaded: ({ loaded }) => ({ loaded: !loaded }),
    setTargetLayerIdx: ({targetLayerIdx}, newLayerIdx) => ({targetLayerIdx: parseInt(newLayerIdx)}),
    setCurrentLayerIdx: ({curLayerIdx}, newLayerIdx) => ({curLayerIdx: parseInt(newLayerIdx)}),
    setCurrentLayerTheme: ({curLayerTheme}, newLayerTheme) => ({curLayerTheme: newLayerTheme || 'default'}),
    scrollPosition: ({scrollPosition}, newScrollPosition) => ({scrollPosition: newScrollPosition})
  }
};
 
export const { Provider, connect } = initStore(store);