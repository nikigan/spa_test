import React from 'react';
import './VideoSearch.scss';
import {onFavoriteModalOpenToSave, onVideoSearch, onVideoSearchChange, onVideosLoaded} from '../../actions'
import Search from "antd/es/input/Search";
import {connect} from "react-redux";
import {Button, Popover, Tooltip} from "antd";
import {HeartOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import 'antd/es/popover/style/css';
import 'antd/es/tooltip/style/css';
import 'antd/es/button/style/css';

const VideoSearch = props => {
    const {onVideoSearchChange, onVideoSearch, onFavoriteModalOpenToSave, loading, queryText, popVisible} = props;

    const popoverContent = (
        <div style={{width: '220px'}}>
            <p>Поиск сохранён в разделе «Избранное»</p>
            <Link to='/favorite'>Перейти в избранное</Link>
        </div>
    );

    const button = (
        <Popover content={popoverContent} placement='bottom' visible={popVisible}>
            <Button
                disabled={!queryText}
                type='link'
                size='large'
                onClick={() => onFavoriteModalOpenToSave(queryText)}>
                <HeartOutlined style={{fontSize: '20px'}}/>
            </Button>
        </Popover>
    );
    const buttonWithToolTip = queryText ?
        (button) :
        (<Tooltip title='Введите текст запроса!'>
            {button}
        </Tooltip>);

    return (
        <div className='search-block'>
            <h2 className='search-header'>Поиск видео</h2>
            <Search
                className='search-input'
                placeholder="Введите название видео"
                onSearch={value => onVideoSearch(value)}
                onChange={(e) => onVideoSearchChange(e.target.value)}
                value={queryText}
                enterButton
                loading={loading}
                suffix={buttonWithToolTip}
            />
        </div>
    );
};

const mapStateToProps = ({video: {loading, queryText, favoritePopoverVisible}}) => {
  return {
    loading,
    queryText,
    popVisible: favoritePopoverVisible
  }
};

export default connect(mapStateToProps, {
  onVideoSearch,
  onVideosLoaded,
  onFavoriteModalOpenToSave,
  onVideoSearchChange
})(VideoSearch);