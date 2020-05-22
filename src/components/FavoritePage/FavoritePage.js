import React from 'react';
import './FavoritePage.scss';
import {Button, List} from "antd";
import 'antd/es/list/style/css';
import {connect} from "react-redux";
import {onFavoriteDeleted, onFavoriteExec, onFavoriteModalOpenToEdit} from "../../actions";
import {withRouter} from "react-router-dom";

const FavoritePage = props => {

  const onExecute = (item) => {
    props.onFavoriteExec(item)
  };

    const {favorite, onFavoriteModalOpenToEdit, onFavoriteDeleted} = props;
  return (
      <React.Fragment>
        <h2>Избранное</h2>
        <List
          itemLayout='horizontal'
          bordered
          dataSource={favorite}
          locale={{emptyText: 'Нет избранных запросов'}}
          renderItem={(item, idx) => (
            <List.Item
              className='list-item'
              actions={[
                <Button type='link' onClick={() => onExecute(item)}>Выполнить</Button>,
                <Button type='link' onClick={() => onFavoriteModalOpenToEdit(idx)}>Изменить</Button>,
                <Button type='link' onClick={() => onFavoriteDeleted(idx)} danger>Удалить</Button>]}>
              {item.name}
            </List.Item>
          )}/>
      </React.Fragment>
    );
};

const mapStateToProps = ({favorite}) => {
  return {
    favorite
  }
};

export default withRouter(connect(mapStateToProps, {onFavoriteModalOpenToEdit, onFavoriteDeleted, onFavoriteExec})(FavoritePage));