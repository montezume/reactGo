import { voteService } from 'services';
import * as types from 'types';

const fetchData = () => {
  return {
    type: types.GET_TOPICS,
    promise: voteService.getTopics().then(res => { return {type: 'GET_TOPICS_SUCCESS', data: res.data }; })
  };
};

export default fetchData;
