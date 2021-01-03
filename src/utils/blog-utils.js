


export const getFilteredBlogPosts = (allPosts, filteredTags = []) => {
  if(filteredTags.length === 0){
    return allPosts;
  }else{
    return allPosts.filter(post => post.tags.find(t => filteredTags.indexOf(t) > -1));
  }
}


export const enhanceBlogData = blogData => {
  let sorted = sortByDate(blogData.items.map(b => enhanceBlogItem(b)));

  return {
    items: sorted.map((b, idx) => (
      { ...b, entry: (sorted.length - idx) }
    ))
  }
}

const enhanceBlogItem = blogItem => {
  return {
    ...blogItem,
    timestamp: getBlogTimestamp(blogItem.date)
  }
}

const getBlogTimestamp = dateString => {
  try{
    let d = new Date(dateString);
    if(!d.getTime()) throw 'bad date';
    return d;
  }
  catch(e){
    return new Date();
  }
}

const sortByDate = (allPosts) => allPosts.sort((a, b) => a.timestamp < b.timestamp ? 1 : -1);