import axios from 'axios';

const BASE_URL = 'http://localhost:8000/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

const getRequest = (url, params) => axios.get(BASE_URL + url, { params });

// Endpoints
const ENDPOINT = {
  BUSINESS_SEARCH: 'business_search',
};

export const search = (query) =>
  getRequest(ENDPOINT.BUSINESS_SEARCH, { ...query });
