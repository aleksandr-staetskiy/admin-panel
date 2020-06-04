import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth.js';

Vue.use(Vuex);

export default new Vuex.Store({
  debug: true,
  state: {
    houses: [],
    sidebarData: [
      {
        id: 1,
        title: 'Название вида плана',
        empty: true,
      },
      {
        id: 333,
        title: 'Название вида плана 2',
        empty: false,
      },
      {
        id: 432,
        title: 'Название вида плана 3',
        empty: true,
      },
    ],
    rooms_data: [],
    tableLoading: false,
  },

  mutations: {
    SET_HOUSES(state, payload) {
      state.houses = payload;
    },
    SET_PLANS(state, payload) {
      state.sidebarData = payload;
    },
    ADD_PLAN(state) {
      state.sidebarData.push({
        id: new Date().getTime(),
        title: 'Введите название',
        empty: true,
      });
    },
    RENAME_PLAN(state, payload) {
      state.sidebarData[payload.index].title = payload.val;
    },
    DELETE_PLAN(state, payload) {
      state.sidebarData.splice(payload, 1);
    },
    SET_ROOMS(state, payload) {
      state.rooms_data = payload;
    },
    SET_TABLE_LOADING(state, payload) {
      state.tableLoading = payload;
    },
  },

  actions: {
    GET_DATA({ commit }) {
      return fetch('https://jsonplaceholder.typicode.com/users')
        .then((resp) => resp.json())
        .then((json) => (commit('SET_HOUSES', json)));
    },

    async GET_ROOMS({ commit }) {
      commit('SET_TABLE_LOADING', true);

      return fetch('https://jsonplaceholder.typicode.com/users')
        .then((resp) => resp.json())
        .then((json) => {
          commit('SET_ROOMS', json);
          commit('SET_TABLE_LOADING', false);
        });
    },
  },
  modules: {
    auth,
  },
});
