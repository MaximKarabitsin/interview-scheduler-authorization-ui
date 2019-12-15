import axios from "axios";

const AXIOS = axios.create({
  // host:port for back-server,
  baseURL: `http://localhost:8091/api`,
  timeout: 5000
});

export default {
  getAllRules() {
    return AXIOS.get(`/rule`);
  },
  getRulesByPageAndSort(page, size, sortBy, sortDesc) {
    return AXIOS.get(
      `/rule?page=${page}&size=${size}&sort=${sortBy},${sortDesc}`
    );
  },
  getRuleByID(id) {
    return AXIOS.get(`/rule/${id}`);
  },
  addRule(rule) {
    return AXIOS.post(`/rule`, rule);
  },
  deleteRuleByID(id) {
    return AXIOS.delete(`/rule/${id}`);
  },
  putRuleById(id, rule) {
    return AXIOS.put(`/rule/${id}`, rule);
  },
  getAllPolicies() {
    return AXIOS.get(`/policy`);
  },
  getPoliciesByPageAndSort(page, size, sortBy, sortDesc) {
    return AXIOS.get(
      `/policy?page=${page}&size=${size}&sort=${sortBy},${sortDesc}`
    );
  },
  getPolicyByID(id) {
    return AXIOS.get(`/policy/${id}`);
  },
  addPolicy(policy) {
    return AXIOS.post(`/policy`, policy);
  },
  deletePolicyByID(id) {
    return AXIOS.delete(`/policy/${id}`);
  },
  putPolicyById(id, policy) {
    return AXIOS.put(`/policy/${id}`, policy);
  },
  getAllPolicySets() {
    return AXIOS.get(`/policyset`);
  },
  getPolicySetsByPageAndSort(page, size, sortBy, sortDesc) {
    return AXIOS.get(
      `/policyset?page=${page}&size=${size}&sort=${sortBy},${sortDesc}`
    );
  },
  getPolicySetByID(id) {
    return AXIOS.get(`/policyset/${id}`);
  },
  addPolicySet(policy) {
    return AXIOS.post(`/policyset`, policy);
  },
  deletePolicySetByID(id) {
    return AXIOS.delete(`/policyset/${id}`);
  },
  putPolicySetById(id, policy) {
    return AXIOS.put(`/policyset/${id}`, policy);
  }
};
