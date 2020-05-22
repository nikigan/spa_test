import React from 'react';
import './VideoList.scss';
import {connect} from 'react-redux';
import {Button, Row} from "antd";
import {Loading} from 'element-react';
import 'antd/es/grid/style/index.css';
import 'antd/es/spin/style/index.css';
import Video from "../Video";
import UnorderedListOutlined from "@ant-design/icons/lib/icons/UnorderedListOutlined";
import AppstoreOutlined from "@ant-design/icons/lib/icons/AppstoreOutlined";
import {onCardLayout, onListLayout} from "../../actions";

const VideoList = props => {
  const {items: videos, loading, query, layout, onCardLayout, onListLayout} = props;

  const listLayout = layout === 'list';

  const renderVideos = videos.map(v => {
    return (
        <Video layout={layout} key={v.id} video={v}/>
    )
  });

  if (loading) {
    return (<Loading/>);
  }

  return (
      <React.Fragment>
        {!!videos.length &&
        <div className='video-list-header'>
          <span className='search-query'>Видео по запросу
            <span className='query-string'> «{query}»:</span>
          </span>
          <div className='button-block'>
            <Button
                type='link'
                icon={<UnorderedListOutlined className={listLayout ? 'active' : ''}/>}
                onClick={onListLayout}/>
            <Button
                type='link'
                icon={<AppstoreOutlined className={listLayout ? '' : 'active'}/>}
                onClick={onCardLayout}/></div>
        </div>}
        <Row type='flex' gutter={[16, 16]}>
          {renderVideos}
        </Row>
      </React.Fragment>
  );
};

const mapStateToProps = ({video: {items, loading, query, layout}}) => {
  return {
    items,
    loading,
    query,
    layout
  }
};

export default connect(mapStateToProps, {onListLayout, onCardLayout})(VideoList);