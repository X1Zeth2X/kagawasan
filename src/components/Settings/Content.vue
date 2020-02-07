<template>
  <v-expansion-panel>
    <v-expansion-panel-header expand-icon="ion-ios-arrow-down">
      CONTENT
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <v-alert
        type="warning"
        border="left"
        icon="ion-ios-warning"
        class="mt2"
        colored-border
      >
        Note that using Markdown will import and load the required plugins which
        may slow down performance.
      </v-alert>

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
export default class Content extends Vue {
  @Action("toggleMarkdown", { namespace }) private toggleMarkdown!: Function;

  private items: Option[] = [
    {
      title: "Markdown",
      subtitle:
        "Markdown syntax on contents. (If the code highlighting is not working, simple go to another page and back)",
      value: this.$store.getters["settings/markdown"],
      onChange: this.toggleMarkdown
    }
  ];
}
</script>
