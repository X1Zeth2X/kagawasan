<template>
  <div id="composer">
    <v-card class="c-main" hover>
      <v-textarea rows="2" auto-grow
        :solo-inverted="$vuetify.theme.dark"
        :solo="!$vuetify.theme.dark"
      ></v-textarea>

      <v-card-actions>
        <v-btn-toggle v-model="mode" rounded>
          <v-btn>
            <v-icon>ion-ios-create</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>ion-ios-image</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>ion-ios-aperture</v-icon>
          </v-btn>
        </v-btn-toggle>
        <v-spacer></v-spacer>

        <v-btn fab small color="teal">
          <v-icon>
            ion-ios-send
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Composer extends Vue {
  private mode: number = 0;
}
</script>

<style lang="scss">
#composer {
  .c-main {
    border-radius: 0.2em 0.2em 2em 2em;
  }
}
</style>
