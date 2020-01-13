<template>
  <div id="profileView">
    <v-img
      src="https://source.unsplash.com/o8cMgOUB-Z0/1280x720"
      height="16em"
      class="elevation-3"
    ></v-img>
    <v-container>
      <v-row align="start" justify="space-around">
        <v-col md="4" cols="12" class="p-content">
          <v-card class="mt4 b-card">
            <div class="tc pt3">
              <v-avatar size="12em" class="elevation-10">
                <v-img
                  src="https://source.unsplash.com/zDEdUs9z1zQ/1280x720"
                  fit
                ></v-img>
              </v-avatar>
              <h3 class="f3">Zeth Leonardo</h3>
              <p>@X1Zeth2X</p>
            </div>

            <v-card-text>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Doloribus, explicabo.
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn icon>
                <v-icon>ion-logo-github</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>ion-logo-twitter</v-icon>
              </v-btn>

              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>ion-md-more</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" md="8">
          <v-tabs grow class="elevation-2">
            <v-tab>About</v-tab>
            <v-tab>Posts</v-tab>
            <v-tab>Saves</v-tab>
          </v-tabs>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Profile extends Vue {}
</script>

<style lang="scss">
.p-content {
  margin-top: -6.5em;
}
</style>
