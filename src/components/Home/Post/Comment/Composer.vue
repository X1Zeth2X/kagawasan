<template>
  <div id="commentComposer">
    <v-list-item three-line>
      <v-list-item-avatar size="40" class="[avatar ? 'pb2' : 'accent']">
        <v-avatar class="primary" size="40">
          <v-icon dark>ion-ios-person</v-icon>
        </v-avatar>
      </v-list-item-avatar>

      <v-list-item-content class="text-end">
        <v-textarea rows="1" auto-grow class="pa0"></v-textarea>

        <div>
          <v-btn text small>
            Cancel
          </v-btn>

          <v-btn small icon dark class="primary darken-1 mr1">
            <v-icon small>
              ion-ios-image
            </v-icon>
          </v-btn>

          <v-btn small icon dark class="teal">
            <v-icon small>
              ion-ios-send
            </v-icon>
          </v-btn>
        </div>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class CommentComposer extends Vue {}
</script>
