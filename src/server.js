import axios from 'axios';
console.log(process.env.BASE_URL)
const BASE_URL = process.env.BASE_URL
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
