<template>
  <v-navigation-drawer
    app
    :mini-variant="$vuetify.breakpoint.mdAndUp && miniDrawer"
    :value.sync="showDrawer"
    disable-resize-watcher
  >
    <template v-slot:prepend>
      <v-list-item>
        <img :src="require('@/assets/logo.png')" height="30em" class="mt2" />
        <div class="f2 fw7 ml2">KONISHI</div>
        <sup>v0.1</sup>
      </v-list-item>
    </template>

    <v-list rounded>
      <v-list-item-group v-model="currentPage">
        <v-list-item
          v-for="(page, index) in pages"
          :key="index"
          @click="goTo(page.routeName)"
        >
          <v-list-item-icon>
            <v-icon>{{ page.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-title>
            {{ page.label }}
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <template v-slot:append>
      <v-divider></v-divider>
      <CurrentUser />
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Action } from "vuex-class";

import CurrentUser from "./Drawer/CurrentUser.vue";

interface Page {
  label: string;
  icon: string;
  routeName: string | undefined;
}

const namespace: string = "settings";

@Component({
  components: {
    CurrentUser
  }
})
export default class Drawer extends Vue {
  @Getter("miniDrawer", { namespace }) private miniDrawer!: boolean;
  @Getter("showDrawer", { namespace }) private showDrawer!: boolean;

  private pages: Page[] = [
    {
      label: "Feed",
      icon: "ion-md-paper",
      routeName: "home"
    },
    {
      label: "Contribute",
      icon: "ion-ios-git-branch",
      routeName: undefined
    },
    {
      label: "Settings",
      icon: "ion-ios-settings",
      routeName: "settings"
    }
  ];

  private goTo(routeName: string) {
    if (routeName !== undefined && this.$route.name !== routeName) {
      this.$router.push({
        name: routeName
      });
    }
  }

  private currentPage(): number {
    const index = this.pages.map(e => e.routeName).indexOf(this.$route.name);
    return index;
  }
}
</script>
