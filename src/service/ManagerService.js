import axios from "axios";

const server = axios.create({
  baseURL: "/server",
  headers: {
    Accept: "application/json",
    "Content-Type": "applicatioin/json"
  },
  timeout: 10000
});

server.interceptors.request.use(
  config => {
    config.headers.Authorization = sessionStorage.getItem("authToken");
    return config;
  },
  error => Promise.reject(error)
);

export default {
  downloadMasterplan(sortByStartDate) {
    return server.get("/r/getMasterplan?sortByStartDate=" + sortByStartDate);
  }
};
