<template>
  <div id="Navbar" v-if="$route.meta.showNav">
    <Drawer />

    <v-app-bar
      app
      fixed
      dense
      :color="$vuetify.theme.dark ? '' : 'grey lighten-1'"
    >
      <v-app-bar-nav-icon @click="toggleDrawer"
        ><v-icon>ion-ios-menu</v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-items>
        <v-btn icon>
          <v-icon>ion-ios-alert</v-icon>
        </v-btn>
      </v-toolbar-items>
      <!-- Left aligned toolbar items -->

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn icon>
          <v-icon>
            ion-ios-notifications-outline
          </v-icon>
        </v-btn>
        <v-btn icon @click="logout">
          <v-icon>
            ion-ios-log-out
          </v-icon>
        </v-btn>
      </v-toolbar-items>
      <!-- Right aligned toolbar items -->
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import Drawer from "./Drawer.vue";
import { Action } from "vuex-class";

const namespace: string = "settings";

@Component({
  components: {
    Drawer
  }
})
export default class Navbar extends Vue {
  @Action("toggleDrawer", { namespace }) private toggleDrawer!: Function;

  @Action("logout", { namespace: "auth" }) private logoutVuex!: Function;

  public logout() {
    this.logoutVuex();

    // Router go resets the Vue to its base state.
    this.$router.go(0);
  }
}
</script>
