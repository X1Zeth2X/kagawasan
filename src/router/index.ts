import Vue from "vue";
import VueRouter from "vue-router";
import Auth from "@/views/Auth.vue";
import store from '@/store';

// Lazily import components
const Home = () => import("@/views/Home.vue");
const Settings = () => import("@/views/Settings.vue");
const Profile = () => import("@/views/Profile.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      showNav: true
    }
  },
  {
    path: "/profile/:username",
    name: "profile",
    component: Profile,
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
    component: Settings,
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
  const isPublic = to.matched.some((record) => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(
    (record) => record.meta.onlyWhenLoggedOut,
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
})

export default router;
