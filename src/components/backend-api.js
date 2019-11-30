import axios from "axios";

const AXIOS = axios.create({
  // baseURL: `http://host.docker.internal:8091/api`,
  baseURL: `http://localhost:8091/api`,
  timeout: 1000
});

export default {
  getAllRules() {
    return AXIOS.get(`/rule`);
  },
  getRulesByPageAndSort(page, size, sortBy, sortDesc) {
    return AXIOS.get(
      `/rule?page=${page}&size=${size}&sortBy=${sortBy}&sortDesc=${sortDesc}`
    );
  },
  getRuleByID(id) {
    return AXIOS.get(`/rule/${id}`);
  },
  deleteRuleByID(id) {
    return AXIOS.delete(`/rule/${id}`);
  },
  putRuleById(id,rule){
    return AXIOS.put(`/rule/${id}`, rule);
  }
};
