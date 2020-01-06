<template>
  <div id="Navbar" v-if="$route.meta.showNav">
    <Drawer />

    <v-app-bar
      app
      fixed
      dense
      :color="$vuetify.theme.dark ? '' : 'grey lighten-1'"
    >
      <v-app-bar-nav-icon
        v-show="$vuetify.breakpoint.mdAndDown"
        @click="toggleDrawer"
        ><v-icon>ion-ios-menu</v-icon>
      </v-app-bar-nav-icon>

      <v-btn icon>
        <v-icon>ion-ios-alert</v-icon>
      </v-btn>

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
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import Drawer from "./Drawer.vue";
import { Action } from "vuex-class";

const namespace: string = "themeLayout";

@Component({
  components: {
    Drawer
  }
})
export default class Navbar extends Vue {
  @Action("toggleDrawer", { namespace }) private toggleDrawer!: Function;

  public logout() {
    this.$router.push({
      name: "auth"
    });
  }
}
</script>
