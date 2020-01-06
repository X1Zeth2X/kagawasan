import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Auth from "@/views/Auth.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    meta: {
      showNav: true
    }
  },
  {
    path: "/auth",
    name: "auth",
    component: Auth,
    meta: {
      public: true,
      onlyWhenLoggedOut: true,
      showNav: false
    }
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("@/views/Settings.vue"),
    meta: {
      showNav: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
