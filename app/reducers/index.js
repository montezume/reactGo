import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import user from './user';
import message from './message';
import intl from './intl';
import * as types from '../types';

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_DATA_REQUEST:
      return true;
    case types.FETCH_DATA_SUCCESS:
    case types.FETCH_DATA_FAILURE:
      return false;
    default:
      return state;
  }
};

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  isFetching,
  intl,
  user,
  message,
  routing
});

export default rootReducer;
