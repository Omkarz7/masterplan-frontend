import axios from "axios";

const server = axios.create({
  baseURL: "/server",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: 10000
});

export default {
  login(userCredentials) {
    return server.post("/o/login", userCredentials);
  }
};
