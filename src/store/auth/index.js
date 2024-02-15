import axios from "../../libs/axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    token: "",
    usuario: "",
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    auth({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("api/login", payload)
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            axios.defaults.headers.common["Authorization"] =
              response.data.token;
              
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
  },
  getters: {},
});
