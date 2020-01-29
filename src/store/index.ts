import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

import { RootState } from "./types";
// Use VuexPersist
import VuexPersist from "vuex-persist";

import { settings } from "./modules/settings/index";
import { auth } from "./modules/auth/index";

import { dialog } from "./modules/dialog/index";
import { feed } from "./modules/feed/index";
import { post } from "./modules/post/index";
import { comment } from "./modules/comment/index";

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist<RootState>({
  storage: window.localStorage,
  reducer: state => ({
    // @ts-ignore
    settings: state.settings,
    auth: {
      // @ts-ignore
      accessToken: state.auth.accessToken,
      // @ts-ignore
      currentUser: state.auth.currentUser
    }
  })
});

const store: StoreOptions<RootState> = {
  state: {
    version: "0.0.1"
  },
  modules: {
    // Register modules
    settings,
    auth,
    dialog,
    feed,
    post,
    comment
  },
  plugins: [vuexLocalStorage.plugin]
};

export default new Vuex.Store<RootState>(store);
