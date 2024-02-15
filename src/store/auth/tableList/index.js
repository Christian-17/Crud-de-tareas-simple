import axios from "../../../libs/axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    tareas: {
      tareas: [],
    },
  },
  mutations: {
    GET_TAREAS(state, payload) {
      state.tareas = payload;
    },
  },
  actions: {
    getTareas() {
      return new Promise((resolve, reject) => {
        return axios
          .get("api/tareas")
          .then((response) => resolve(response.data))
          .catch((error) => reject(error));
      });
    },
    postTareas({commit}, payload) {
      return new Promise((resolve, reject) => {
        return axios 
        .post("api/tareas", payload)
        .then((response) => resolve(response))
        .then((error) => reject(error))
        
      })
    },
    putTareas({commit}, payload) {
      return new Promise((resolve, reject) => {
        return axios 
        .put(`api/tareas/${payload.id}`, payload)
        .then((response) => resolve(response))
        .then((error) => reject(error))
        
      })
    },
    putTareasCompletar({commit}, payload) {
      return new Promise((resolve, reject) => {
        return axios 
        .put(`api/tareas/completed/${payload.id}`, payload)
        .then((response) => resolve(response))
        .then((error) => reject(error))
        
      })
    },
    deleteTareas({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`api/tareas/${payload.id}`)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
  },
  getters: {},
});
