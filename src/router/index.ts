import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Auth from "@/views/Auth.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    // component: () => import('@/views/Home.vue'),
    component: Home
  },
  {
    path: "/auth",
    name: "auth",
    // component: () => import('@/views/Home.vue'),
    component: Auth,
    meta: {
      public: true,
      onlyWhenLoggedOut: true,
      showNav: false
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
