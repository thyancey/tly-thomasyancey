import { initStore } from 'react-waterfall';

const store = {
  initialState: {
    loaded:false,
    curLayerIdx:null
  },
  actions: {
    toggleLoaded: ({ loaded }) => ({ loaded: !loaded }),
    setLayer: ({curLayerIdx}, newLayerIdx) => ({curLayerIdx: newLayerIdx})
  }
};
 
export const { Provider, connect } = initStore(store);