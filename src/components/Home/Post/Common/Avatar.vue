<template>
  <v-list-item-avatar class="pb1 ml2">
    <a>
      <v-avatar size="40">
        <v-img :src="avatarUrl" v-if="avatarUrl"></v-img>
        <v-icon dark class="primary" v-else>ion-ios-person</v-icon>
      </v-avatar>
    </a>
  </v-list-item-avatar>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class Avatar extends Vue {
  @Prop() avatarUrl!: string | null;
}
</script>
