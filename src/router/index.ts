import Vue from "vue";
import VueRouter from "vue-router";
import Auth from "@/views/Auth.vue";
import store from "@/store";

// Lazy import handler
const loadView = function(view: string) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: loadView("Home"),
    meta: {
      showNav: true
    }
  },
  {
    path: "/profile/:username",
    name: "profile",
    component: loadView("Profile"),
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
    component: loadView("Settings"),
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

router.beforeEach((to, _, next) => {
  const isPublic = to.matched.some(record => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(
    record => record.meta.onlyWhenLoggedOut
  );

  const loggedIn = !!store.getters["auth/accessToken"];

  if (!isPublic && !loggedIn) {
    return next({
      name: "auth"
    });
  }

  if (loggedIn && onlyWhenLoggedOut) {
    return next({
      name: "home"
    });
  }

  next();
});

export default router;
