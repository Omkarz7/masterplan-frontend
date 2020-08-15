import Vue from "vue";
import Vuex from "vuex";
import OpenService from "@/service/OpenService.js";
import ManagerService from "@/service/ManagerService.js";

Vue.use(Vuex);
//Given the small size of the application, I am not using any modules
export default new Vuex.Store({
  state: {},
  mutations: {
    SET_AUTH_TOKEN: (state, authtoken) => {
      sessionStorage.setItem("authToken", authtoken);
    }
  },
  actions: {
    login({ commit }, log) {
      return new Promise((resolve, reject) => {
        OpenService.login(log)
          .then(response => {
            commit("SET_AUTH_TOKEN", response.headers.authorization);
            resolve();
          })
          .catch(error => {
            reject({
              statusCode: error.response.status,
              errorMessage: error.response.data.Error
            });
          });
      });
    },
    downloadMasterplan(state, sortByStartDate) {
      return new Promise((resolve, reject) => {
        ManagerService.downloadMasterplan(sortByStartDate)
          .then(response => {
            var fileData = window.URL.createObjectURL(
              new Blob([response.data])
            );
            var fileLink = document.createElement("a");
            fileLink.href = fileData;

            var fileName = response.headers["content-disposition"]
              .split("filename=")[1]
              .split(";")[0];
            fileLink.setAttribute("download", fileName);
            document.body.appendChild(fileLink);

            fileLink.click();
            resolve();
          })
          .catch(error => {
            reject({
              statusCode: error.response.status,
              errorMessage: error.response.data.Error
            });
          });
      });
    }
  },
  modules: {}
});
