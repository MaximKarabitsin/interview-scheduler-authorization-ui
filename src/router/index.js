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
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
