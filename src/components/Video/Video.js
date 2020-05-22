import React from 'react';
import './Video.scss';
import {Col} from "antd";

const Video = props => {
  const {video, layout} = props;

  return (
      <Col span={layout === 'list' ? 24 : 6} className={'youtube-video-wrapper ' + layout}>
        <div className='row'>
          <div className={layout === 'list' ? 'col-4' : 'col-12'}>
            <iframe
                title={video.title}
                className='youtube-video'
                src={video.url}
                frameBorder='0'
                allowFullScreen/>
          </div>
          <div className={layout === 'list' ? 'col-8' : 'col-12'}>
            <div className='description'>
              <p className='video-title'>{video.title}</p>
              <p className='video-description'>{video.description}</p>
              <a href={video.channelUrl} target='_blank' rel='noopener noreferrer'
                 className='video-channel-title'>{video.channelTitle}</a>
            </div>
          </div>
        </div>
      </Col>
  );
};


export default Video;