<template>
  <v-list-item-avatar class="pb1 ml2">
    <a>
      <v-avatar size="40">
        <v-img
          src="https://api.adorable.io/avatars/50/abott@adorable.png"
          v-if="avatar"
        ></v-img>
        <v-icon dark class="primary" v-else>ion-ios-person</v-icon>
      </v-avatar>
    </a>
  </v-list-item-avatar>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class CommentAvatar extends Vue {
  private avatar: boolean = false;
}
</script>
