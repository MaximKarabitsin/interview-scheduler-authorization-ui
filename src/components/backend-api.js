import axios from "axios";

const AXIOS = axios.create({
  baseURL: `http://host.docker.internal:8091/api`,
  timeout: 1000
});

export default {
  getRules() {
    return AXIOS.get(`/rule`);
  },
  getRuleByID(id) {
    return AXIOS.get(`/rule/` + id);
  }
};
