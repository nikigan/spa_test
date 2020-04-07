import {onVideoSearch} from "./video";
import {history} from "../index";

const onFavoriteModalOpenToSave = (query) => {
  return{
    type: 'FAVORITE_MODAL_OPEN_TO_SAVE',
    payload: query
  }
};

const onFavoriteModalOpenToEdit = (idx) => {
  return {
    type: 'FAVORITE_MODAL_OPEN_TO_EDIT',
    payload: idx
  }
};

const onFavoriteModalSaveChanges = (modalValues) =>  (dispatch, getState) => {

  dispatch({
    type: 'FAVORITE_MODAL_SAVE_CHANGES',
    payload: {modalValues, idx: getState().modal.idx}
  });
};

const onFavoriteModalSave = (modalValues) => dispatch =>{
    dispatch({
      type: 'FAVORITE_MODAL_SAVE',
      payload: modalValues
    });
    setTimeout(() => {
      dispatch({
        type: 'FAVORITE_POPOVER_CLOSE'
      })
    }, 5000);
};

const onFavoriteModalClose = () => {
  return {
    type: 'FAVORITE_MODAL_CLOSE'
  }
};

const onFavoriteDeleted = (idx) => {
  return {
    type: 'FAVORITE_DELETED',
    payload: idx
  }
};

const onFavoriteExec = (favorite) => (dispatch) => {
  history.push('/');
  const {query, sortBy, maxCount} = favorite;
  dispatch(onVideoSearch(query, sortBy, maxCount));
};

const onFavoriteLoaded = () => (dispatch, getState) => {
  const localFavorite = JSON.parse(localStorage.getItem('favorite' + getState().userInfo.userToken));
  dispatch({
    type: 'FAVORITE_LOADED',
    payload: localFavorite? localFavorite : []
  });
};

export {
  onFavoriteModalOpenToSave,
  onFavoriteModalSave,
  onFavoriteModalClose,
  onFavoriteModalOpenToEdit,
  onFavoriteModalSaveChanges,
  onFavoriteDeleted,
  onFavoriteExec,
  onFavoriteLoaded
}