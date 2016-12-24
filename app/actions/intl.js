/* eslint consistent-return: 0, no-else-return: 0*/
import * as types from 'types';

export function loadIntlMessages() {
  const en = require('../messages/en.json');
  const fr = require('../messages/fr.json');

  const messages = {
    en,
    fr
  };

  return {
    type: types.LOAD_INTL_MESSAGES,
    payload: messages
  };
}

export default {
  loadIntlMessages
};
