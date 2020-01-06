<template>
  <div id="layoutSettings">
    <v-card>
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
            <v-switch inset v-model="item.value"></v-switch>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Layout extends Vue {
  private items: object[] = [
    {
      title: "Mini Drawer",
      subtitle: "Use mini navigation drawers.",
      value: false
    },
    {
      title: "Masonry",
      subtitle: "Use Masonry layout instead of standard layout.",
      value: false
    }
  ];
}
</script>
