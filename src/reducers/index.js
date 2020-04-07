const initialState = {
  userInfo: null,
  auth: {
    loading: false,
  },
  video: {
    query: '',
    queryText: '',
    items: [],
    loading: false,
    layout: 'list',
    favoritePopoverVisible: false
  },
  modal: {
    edit: false,
    show: false,
    query: '',
    name: '',
    sortBy: '',
    maxCount: 12,
    idx: null
  },
  favorite: []
};

const updateFavorite = (state, item, idx) => {
  let newFavorite;
  if (idx < 0) {
    newFavorite = [
      ...state.favorite,
      {...item}
    ];
  } else if (item === null) {
    newFavorite = [
      ...state.favorite.slice(0, idx),
      ...state.favorite.slice(idx + 1)
    ];
  } else {
    newFavorite = [
      ...state.favorite.slice(0, idx),
      {...item},
      ...state.favorite.slice(idx + 1)
    ];
  }
  localStorage.setItem('favorite' + state.userInfo.userToken, JSON.stringify(newFavorite));
  return newFavorite;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case 'USER_LOG_IN': {
      return {
        ...state,
        auth: {
          loading: true,
        }
      }
    }

    case 'USER_LOGGED_IN': {
      const {login, userToken} = action.payload;
      return {
        ...state,
        userInfo: {
          login: login,
          userToken: userToken
        },
        auth: {
          loading: false,
        }
      }
    }

    case 'USER_LOGGED_OUT': {
      return {
        ...initialState
      }
    }

    case 'USER_LOG_IN_ERROR': {
      return {
        ...state,
        auth: {
          loading: false,
        }
      }
    }

    case 'TOKEN_LOADED': {
      const {login, userToken} = action.payload;

      return {
        ...state,
        userInfo: {
          login,
          userToken
        }
      }
    }

    case 'VIDEO_SEARCH_CHANGE':
      return {
        ...state,
        video: {
          ...state.video,
          queryText: action.payload
        }
      };

    case 'VIDEO_SEARCH_START':
      return {
        ...state,
        video: {
          ...state.video,
          queryText: action.payload,
          query: action.payload,
          items: [],
          loading: true
        }
      };

    case 'LIST_LAYOUT_SET':
      return {
        ...state,
        video: {
          ...state.video,
          layout: 'list'
        }
      };

    case 'CARD_LAYOUT_SET':
      return {
        ...state,
        video: {
          ...state.video,
          layout: 'cards'
        }
      };

    case 'VIDEOS_LOADED':
      return {
        ...state,
        video: {
          ...state.video,
          items: action.payload,
          loading: false
        }
      };

    case 'FAVORITE_LOADED':

      return {
        ...state,
        favorite: action.payload
      };

    case 'FAVORITE_MODAL_OPEN_TO_SAVE':
      return {
        ...state,
        modal: {
          ...state.modal,
          edit: false,
          show: true,
          query: action.payload
        }
      };

    case 'FAVORITE_MODAL_CLOSE':
      return {
        ...state,
        modal: {
          ...initialState.modal,
          show: false,
        }
      };

    case 'FAVORITE_MODAL_SAVE':
      return {
        ...state,
        favorite: updateFavorite(state, action.payload, -1),
        modal: {
          ...initialState.modal,
          show: false
        },
        video: {
          ...state.video,
          favoritePopoverVisible: true
        }
      };

    case 'FAVORITE_POPOVER_CLOSE':
      return {
        ...state,
        video: {
          ...state.video,
          favoritePopoverVisible: false
        }
      };

    case 'FAVORITE_MODAL_OPEN_TO_EDIT': {
      const idx = action.payload;
      return {
        ...state,
        modal: {
          show: true,
          edit: true,
          idx: idx,
          ...state.favorite[idx]
        }
      };
    }

    case 'FAVORITE_MODAL_SAVE_CHANGES': {
      const {modalValues, idx} = action.payload;

      return {
        ...state,
        favorite: updateFavorite(state, modalValues, idx),
        modal: {
          ...initialState.modal,
          show: false
        }
      };
    }

    case 'FAVORITE_DELETED': {
      const idx = action.payload;

      return {
        ...state,
        favorite: updateFavorite(state, null, idx)
      }
    }

    default:
      return state;
  }
};

export default reducer;