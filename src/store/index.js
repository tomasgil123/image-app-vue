import { createStore } from "vuex";

export default createStore({
  state: {
    token: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    }
  },
  getters: {
    getToken: state => () => {
      return state.token;
    }
  }
});
