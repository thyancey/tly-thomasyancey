import { initStore } from 'react-waterfall';

const store = {
  initialState: {
    loaded:false,
    curLayerIdx:null,
    scrollPosition:'middle'
  },
  actions: {
    toggleLoaded: ({ loaded }) => ({ loaded: !loaded }),
    setLayer: ({curLayerIdx}, newLayerIdx) => ({curLayerIdx: newLayerIdx}),
    scrollPosition: ({scrollPosition}, newScrollPosition) => ({scrollPosition: newScrollPosition})
  }
};
 
export const { Provider, connect } = initStore(store);