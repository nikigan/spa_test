import YoutubeService from "../services/youtubeService";

const onVideoSearch = (query, sortBy, maxCount) => (dispatch) => {

  dispatch({
    type: 'VIDEO_SEARCH_START',
    payload: query
  });

  const youtubeService = new YoutubeService();
  
  youtubeService.getVideos(query, sortBy, maxCount)
    .then(videos => dispatch(onVideosLoaded(videos)));

};

const onVideoSearchChange = (query) => {
  return{
    type: 'VIDEO_SEARCH_CHANGE',
    payload: query
  }
};

const onVideosLoaded = (items) => {
  return {
    type: 'VIDEOS_LOADED',
    payload: items
  }
};

const onListLayout = () => {
  return {
    type: 'LIST_LAYOUT_SET'
  }
};

const onCardLayout = () => {
  return {
    type: 'CARD_LAYOUT_SET'
  }
};

export {
  onVideoSearch,
  onVideosLoaded,
  onVideoSearchChange,
  onCardLayout,
  onListLayout
}