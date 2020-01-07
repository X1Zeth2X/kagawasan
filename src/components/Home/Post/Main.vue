<template>
  <v-card id="post" class="mb2">
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

    <PostActions />
    <!-- Post Actions (Like, Comment, ...) -->

    <v-divider></v-divider>

    <div>
      <Comment />
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import PostTop from "./Top.vue";
import PostActions from "./Actions.vue";

@Component({
  components: {
    PostTop,
    PostActions,
    Comment: () => import("./Comment/Main.vue")
  }
})
export default class PostMain extends Vue {}
</script>

<style lang="scss">
#post {
  border-radius: 1em;
}
</style>
