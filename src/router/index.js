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
    component: () => import("../views/rules/List.vue")
  },
  {
    path: "/rules/:id",
    name: "rule",
    meta: { layout: "main" },
    component: () => import("../views/rules/Rule.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
