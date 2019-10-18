import axios from 'axios';

const BASE_URL = process.env.BASE_URL
export default {
  getRoles() {
    return axios.get(`${BASE_URL}/api/roles.json`);
  },
  getReplacingRoles() {
    return axios.get(`${BASE_URL}/api/replacingRoles.json`);
  },
};
