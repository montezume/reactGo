import * as types from 'types';
import { combineReducers } from 'redux';

const userAgent = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.SET_USER_AGENT:
      return action.payload;
    default:
      return state;
  }
};

const locale = (
  state = 'fr',
  action
) => {
  switch (action.type) {
    case types.SET_USER_LANGUAGE:
      return action.payload;
    default:
      return state;
  }
};


const userReducer = combineReducers({
  locale,
  userAgent
});

export default userReducer;
