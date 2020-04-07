import axios from 'axios';
import decode from 'unescape';

export default class YoutubeService {

  async getVideos(query, sortBy='', maxResults = 12) {
    const order = sortBy ? `&order=${sortBy}` : "";
    const apiKey = 'AIzaSyAVvFfYqxWHjmYEUcRRUAuqKJ8L07jNaxE';
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&maxResults=${maxResults}&key=${apiKey}${order}`;

    return axios
      .get(url)
      .then(({data: {items}}) => {
        return items.map(i => {
          return {
            title: decode(i.snippet.title, 'all'),
            description: i.snippet.description,
            channelTitle: i.snippet.channelTitle,
            channelUrl: `https://www.youtube.com/channel/${i.snippet.channelId}`,
            id: i.id.videoId,
            url: `https://www.youtube.com/embed/${i.id.videoId}`
          }
        })
      });
  }
}