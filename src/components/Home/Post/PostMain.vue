<template>
  <v-card id="post">
    <PostTop />

    <v-card-text>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem maiores
      rerum, laudantium perspiciatis ab ratione fugit pariatur explicabo.
      Ducimus dolor eligendi dolorum quaerat corrupti aspernatur deleniti
      perferendis voluptatum fugit earum.
    </v-card-text>
    <!-- Post content -->

    <v-img src="https://source.unsplash.com/1600x900/?nature,water"></v-img>
    <!-- Post Image -->

    <v-divider></v-divider>

    <v-card-actions>
      bet
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import PostTop from "./PostTop.vue";

@Component({
  components: {
    PostTop
  }
})
export default class PostMain extends Vue {}
</script>

<style lang="scss">
#post {
  border-radius: 1em;
}
</style>
