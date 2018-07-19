import { initStore } from 'react-waterfall';

const store = {
  initialState: {
    loaded:false,
    curLayerIdx:null,
    scrollPosition:'middle',
    scrollTargetIdx:-1
  },
  actions: {
    toggleLoaded: ({ loaded }) => ({ loaded: !loaded }),
    setLayerIdx: ({curLayerIdx}, newLayerIdx) => ({curLayerIdx: newLayerIdx}),
    scrollPosition: ({scrollPosition}, newScrollPosition) => ({scrollPosition: newScrollPosition})
  }
};
 
export const { Provider, connect } = initStore(store);