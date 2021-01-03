const IMAGE_LOAD_TIMEOUT = 50;
const DATA_LOCATION = './data';
import { enhanceBlogData, enhanceData } from './blog-utils';

class DataBoss {
  constructor(){
   if(!DataBoss.instance){
     this.state = {
      data:{
        blogs: {
          items:[]
        },
        jobs: {
          items:[]
        },
        projects: {
          items:[]
        }
      },
      loadState : false,
      loadTimeout : false
     }

     DataBoss.instance = this;
   }

   return DataBoss.instance;
  }

  getData(type, idx){
    const data = this.state.data[type];
    if(!data){
      console.error(`cannot find data with type ${type}`);
      return [];
    }

    if(idx > -1 && data.items[idx] !== undefined) return data.items[idx];

    return data.items;
  }
  
  loadData(callback){
    this.state.loaded = false;
    this.state.loadedCallback = callback;

    // this.state.loadTimeout = global.setTimeout(() => {
    //   console.log('loadData complete');
    //   callback && callback();
    // }, IMAGE_LOAD_TIMEOUT)

    this.loadJsonData('blogs', (blogData) => {
      this.state.data.blogs = enhanceBlogData(blogData);
      
      this.loadJsonData('projects', (projectData) => {
        this.state.data.projects = enhanceData(projectData);
        
        this.loadJsonData('jobs', (jobData) => {
          this.state.data.jobs = enhanceData(jobData);

          callback()
        })
      })
    });
  }

  loadJsonData(file, callback){
    const url = `${DATA_LOCATION}/${file}.json`;
    // console.log(`reading data from '${url}'`);

    fetch(url)
      .then(res => res.text())
      .then(
        text => {
          return JSON.parse(text)
        }, 
        err => {
          console.error(`Error fetching data from ${url}`, err);
        }
      ) //- bad url responds with 200/ok? so this doesnt get thrown
      .then(
        json => {
          // console.log(`data was read successfully`, json);
          callback(json);
          return true;
        }, 
        err => {
          console.error(`Error parsing data (or the url was bad), skipping`, err && err.stack || err);
        }
      );
  }

  loadImages(callback){
    this.state.loadedImagesCallback = callback;
    this.killImageLoadTimeout();
    this.onImageLoaderTimeout();
  }
  
  onImagesLoaded(){
    this.state.loadedImagesCallback && this.state.loadedImagesCallback();
  }
  getLoadState(){
    return this.state.loadState;
  }

  onImageLoaderTimeout(callback){
    // console.log('onImageLoaderTimeout')
    this.killImageLoadTimeout();
  
    const images = Array.from(document.querySelectorAll('img'));
    const loadedImages = images.filter((i, idx) => (i.complete));
    const loadedPercent = Math.round((loadedImages.length / images.length) * 100);
  
    // console.log(`${loadedImages.length}/${images.length} loaded`);
    if(loadedPercent === 100){
      this.state.loadState = true;
      this.onImagesLoaded();
    }else{
      this.startImageLoadTimeout();
    }
  }
  
  startImageLoadTimeout(){
    this.killImageLoadTimeout();
  
    this.state.loadTimeout = global.setTimeout(() => {
      this.onImageLoaderTimeout();
    }, IMAGE_LOAD_TIMEOUT)
  }

  killImageLoadTimeout(){
    if(this.state.loadTimeout){
      global.clearTimeout(this.state.loadTimeout);
      this.state.loadTimeout = null;
    }
  }
}

const instance = new DataBoss();
Object.freeze(instance);

export default instance;