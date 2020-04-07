import React, {Component} from 'react';
import './Video.scss';
import {Col} from "antd";

class Video extends Component {

  render() {
    const {video, className} = this.props;

    return (
      <Col span={className === 'list'? 24 : 6} className={'youtube-video-wrapper ' + className}>
        <div className='row'>
          <div className={className === 'list'? 'col-4' : 'col-12'}>
            <iframe
              title={video.title}
              className='youtube-video'
              src={video.url}
              frameBorder='0'
              allowFullScreen/>
          </div>
          <div className={className === 'list'? 'col-8' : 'col-12'}>
            <div className='description'>
              <p className='video-title'>{video.title}</p>
              <p className='video-description'>{video.description}</p>
              <a href={video.channelUrl} target='_blank' rel='noopener noreferrer' className='video-channel-title'>{video.channelTitle}</a>
            </div>
          </div>
        </div>
      </Col>
    );
  }
}


export default Video;