<template>
  <v-expansion-panel>
    <v-expansion-panel-header expand-icon="ion-ios-arrow-down">
      THEME AND LAYOUT
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <v-list>
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
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Action } from "vuex-class";

const namespace: string = "settings";

type Option = {
  title: string;
  subtitle: string;
  value: boolean;
  onChange: Function;
};

@Component
export default class Layout extends Vue {
  @Action("toggleMiniDrawer", { namespace })
  private toggleMiniDrawer!: Function;

  @Action("toggleDarkMode", { namespace })
  private toggleDarkModeVuex!: Function;

  @Action("toggleRightContent", { namespace })
  private toggleRightContent!: Function;

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
      value: this.$store.getters["settings/miniDrawer"],
      onChange: this.toggleMiniDrawer
    },
    {
      title: "Full Mode",
      subtitle: "Show right column on home page.",
      value: this.$store.getters["settings/rightContent"],
      onChange: this.toggleRightContent
    }
  ];

  private toggleDarkMode() {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    this.toggleDarkModeVuex();
  }
}
</script>
