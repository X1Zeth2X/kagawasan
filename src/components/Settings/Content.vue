<template>
  <v-expansion-panel>
    <v-expansion-panel-header expand-icon="ion-ios-arrow-down">
      CONTENT
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

interface Option {
  title: string;
  subtitle: string;
  value: boolean;
  onChange: Function;
}

@Component
export default class Content extends Vue {
  @Action("toggleMarkdown", { namespace }) private toggleMarkdown!: Function;

  private items: Option[] = [
    {
      title: "Markdown",
      subtitle:
        "Markdown syntax on contents. (No truncation/limit, this may cause long boi posts.)",
      value: this.$store.getters["settings/markdown"],
      onChange: this.toggleMarkdown
    }
  ];
}
</script>
