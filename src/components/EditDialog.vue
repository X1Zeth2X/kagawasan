<template>
  <v-dialog
    persistent
    :value="false"
    max-width="35em"
  >
    <v-card>
      <Top 
        :author="currentUser"
        :postPublicId="null"
      />
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import Top from "@/components/Home/Post/Top.vue";
import { Getter } from 'vuex-class';
import { User } from '@/store/modules/auth/types';

@Component({
  components: {
    Top
  }
})
export default class Edit extends Vue {
  @Getter("currentUser", { namespace: "auth" }) private currentUser!: User;
}
</script>
