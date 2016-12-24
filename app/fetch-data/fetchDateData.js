import { dateService } from '../services';
import * as types from '../types';

const fetchData = (params) => {
  return {
    type: types.GET_DATE,
    promise: dateService.getDate(params).then(res => { return {type: 'GET_DATE_SUCCESS', data: res.data }; })
  };
};

export default fetchData;
