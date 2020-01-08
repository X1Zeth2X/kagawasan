import Vue from "vue";
import Vuetify from "vuetify/lib";
import store from "@/store";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: store.getters["darkMode"]
  }
});
