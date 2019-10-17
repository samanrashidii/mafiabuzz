import axios from 'axios';

const BASE_URL = 'https://mafiabuzz.netlify.com';
// 'http://localhost:8080'
export default {
  getMainData() {
    return axios.get(`${BASE_URL}/api/main.json`);
  },
  getRoles() {
    return axios.get(`${BASE_URL}/api/roles.json`);
  },
  getReplacingRoles() {
    return axios.get(`${BASE_URL}/api/replacingRoles.json`);
  },
};
