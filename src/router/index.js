import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    meta: { layout: "main" },
    component: () => import("../views/Home.vue")
  },
  {
    path: "/rules",
    name: "rule_list",
    meta: { layout: "main" },
    component: () => import("../views/rules/Table.vue")
  },
  {
    path: "/rules/add",
    name: "rule_add",
    meta: { layout: "main" },
    component: () => import("../views/rules/Add.vue")
  },
  {
    path: "/rules/:id",
    name: "rule_detail",
    meta: { layout: "main" },
    component: () => import("../views/rules/Detail.vue")
  },
  {
    path: "/rules/:id/edit",
    name: "rule_edit",
    meta: { layout: "main" },
    component: () => import("../views/rules/Edit.vue")
  },
  {
    path: "/policies",
    name: "policies_list",
    meta: { layout: "main" },
    component: () => import("../views/policies/Table.vue")
  },
  {
    path: "/policies/add",
    name: "policies_add",
    meta: { layout: "main" },
    component: () => import("../views/policies/Add.vue")
  },
  {
    path: "/policies/:id",
    name: "policies_detail",
    meta: { layout: "main" },
    component: () => import("../views/policies/Detail.vue")
  },
  {
    path: "/policies/:id/edit",
    name: "policies_edit",
    meta: { layout: "main" },
    component: () => import("../views/policies/Edit.vue")
  },
  {
    path: "/policysets",
    name: "policy_sets_list",
    meta: { layout: "main" },
    component: () => import("../views/policysets/Table.vue")
  },
  {
    path: "/policysets/add",
    name: "policy_sets_add",
    meta: { layout: "main" },
    component: () => import("../views/policysets/Add.vue")
  },
  {
    path: "/policysets/:id",
    name: "policy_sets_detail",
    meta: { layout: "main" },
    component: () => import("../views/policysets/Detail.vue")
  },
  {
    path: "/policysets/:id/edit",
    name: "policy_sets_edit",
    meta: { layout: "main" },
    component: () => import("../views/policysets/Edit.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
