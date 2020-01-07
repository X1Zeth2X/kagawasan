<template>
  <div id="layoutSettings">
    <v-card>
      <v-list>
        <v-subheader>THEME AND LAYOUT</v-subheader>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ item.subtitle }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-switch
              inset
              v-model="item.value"
              @change="item.onChange"
            ></v-switch>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Action } from "vuex-class";

const namespace: string = "themeLayout";

interface Option {
  title: string;
  subtitle: string;
  value: boolean;
  onChange: Function;
}

@Component
export default class Layout extends Vue {
  @Action("toggleMiniDrawer", { namespace })
  private toggleMiniDrawer!: Function;
  @Action("toggleMasonryLayout", { namespace })
  private toggleMasonryLayout!: Function;

  private items: Option[] = [
    {
      title: "Dark Mode",
      subtitle: "The best mode ever.",
      value: this.$vuetify.theme.dark,
      onChange: this.toggleDarkMode
    },
    {
      title: "Mini Drawer",
      subtitle: "Use mini navigation drawers.",
      value: this.$store.getters["themeLayout/miniDrawer"],
      onChange: this.toggleMiniDrawer
    },
    {
      title: "Masonry",
      subtitle: "Use masonry layout instead of standard layout. (Keep off for better experience on mobile)",
      value: this.$store.getters["themeLayout/masonryLayout"],
      onChange: this.toggleMasonryLayout
    },
    {
      title: "Animations",
      subtitle: "App animations/transitions. (Disabling might give you increased performance)",
      value: this.$vuetify.theme.dark,
      onChange: this.toggleDarkMode
    }
  ];

  private toggleDarkMode() {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
  }
}
</script>
