import axios from 'axios';

const service = {
  getDate: (params) => axios.get('/date', params)
};

export default service;
