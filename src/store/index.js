import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    params: {
      location: 'full',
    },
  },
  mutations: {
    setParams(state, params) {
      state.params = { ...state.params, ...params };
    },
  },
  actions: {
  },
  modules: {},
});
