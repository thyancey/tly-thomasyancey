import { initStore } from 'react-waterfall';

const store = {
  initialState: {
    loaded:false,
    targetLayerIdx:-1,
    curLayerIdx:-1,
    curLayerTheme:'default',
    curLayerTitle:'not set',
    topRegionMode: '', //- not used yet
    bottomRegionMode: 'blog',
    currentTags: [],
    allTags: [],
  },
  actions: {
    toggleLoaded: ({ loaded }) => ({ loaded: !loaded }),
    setTargetLayerIdx: ({targetLayerIdx}, newLayerIdx) => ({targetLayerIdx: newLayerIdx}),
    setCurrentLayer: ({curLayerIdx,curLayerTheme,curLayerTitle}, newLayerObj) => ({
      curLayerIdx: newLayerObj.idx,
      curLayerTheme: newLayerObj.theme || 'default',
      curLayerTitle: newLayerObj.title
    }),
    setMode_job:() => ({ bottomRegionMode: 'job' }),
    setMode_blog:() => ({ bottomRegionMode: 'blog' }),
    toggleRegionMode: ({ bottomRegionMode }, region, force) => {
      console.log('toggleRegionMode', region, force)
      if(region === 'bottom'){
        if(force) {
          return { bottomRegionMode: force };
        } else{
          return { bottomRegionMode: bottomMode === 'job' ? 'blog' : 'job' };
        }
      }else{
        //- not supported for anything else yet
        return {};
      }
    },
    setAllTags:({}, allTags) => ({ allTags: allTags }),
    selectTag:({}, tagId) => ({ 
      currentTags:  [ tagId ]
    }),
    toggleTag:({ currentTags }, tagId) => { 
      if(currentTags.indexOf(tagId) > -1){
        return { 
          currentTags: currentTags.filter(t => t !== tagId)
        };
      }else{
        return { 
          currentTags: [...currentTags, tagId]
        };
      }
    }
  }
};
 
export const { Provider, connect } = initStore(store);