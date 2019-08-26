import roles from '@/api/roles.json';

export default {
  namespaced: true,
  state: {
    Roles: roles,
  },
  getters: {
    Roles: state => state.Roles,
  },
}