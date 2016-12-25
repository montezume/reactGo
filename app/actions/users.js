import cookie from 'react-cookie';
import * as types from '../types';


export function setUserAgent(userAgent) {
  return {
    type: types.SET_USER_AGENT,
    payload: userAgent
  };
}

export function setUserLanguage(language) {
  cookie.save('locale', language);
  return {
    type: types.SET_USER_LANGUAGE,
    payload: language
  };
}
