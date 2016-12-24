import * as types from '../types';

export default function intl(state = {
  defaultLocale: 'en',
  locales: ['en', 'fr'],
  messages: null
}, action) {
  switch (action.type) {
    case types.LOAD_INTL_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };
    default:
      return state;
  }
}
