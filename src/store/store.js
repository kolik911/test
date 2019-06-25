import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import API from "../API";

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: "my-app",
  reducer: state => ({
    token: state.token,
    key: state.key
  }),
  restoreState: k => {
    const myApp = JSON.parse(localStorage.getItem(k));
    return {
      token: myApp.token,
      key: myApp.key,
      usersList: []
    };
  },
  storage: localStorage
});

export default new Vuex.Store({
  state: {
    usersList: [],
    token: null,
    key: null,
    error: null
  },
  plugins: [vuexPersist.plugin],
  getters: {
    authError: state => {
      return state.error;
    },
    isLoggedIn: state => {
      return state.token && state.key;
    }
  },
  actions: {
    async auth(context, data) {
      try {
        const dataFromDB = await API.auth(data);
        context.commit("auth", dataFromDB);
      } catch (err) {
        console.log(err);
        context.commit("error", err.message);
      }
    },
    async logOut(context) {
      try {
        await API.logOut({
          token: context.state.token,
          key: context.state.key
        });
        context.commit("logOut");
      } catch (err) {
        context.commit("error", err.message);
      }
    },
    async loadUsersList(context) {
      const data = await API.getListUsers({
        token: context.state.token,
        key: context.state.key
      });
      context.commit("usersList", data);
    }
  },
  mutations: {
    auth(state, payload) {
      state.token = payload.token;
      state.key = payload.key;
    },
    usersList(state, payload) {
      state.usersList = payload;
    },
    error(state, payload) {
      state.error = payload;
    },
    logOut(state) {
      state.token = "";
      state.key = "";
      state.usersList = [];
    }
  }
});
