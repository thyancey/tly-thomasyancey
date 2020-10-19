


export const getFilteredBlogPosts = (allPosts, filteredTags = []) => {
  if(filteredTags.length === 0){
    return allPosts;
  }else{
    return allPosts.filter(post => post.tags.find(t => filteredTags.indexOf(t) > -1))
  }
}