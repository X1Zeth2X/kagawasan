<template>
  <div>
    <vue-markdown
      v-if="markdown"
      :source="content"
      :html="false"
      :class="[
        $vuetify.theme.dark ? 'white--text' : 'grey--text text--darken-4'
      ]"
    />

    <truncate
      clamp="Show More"
      :class="[
        $vuetify.theme.dark ? 'white--text' : 'grey--text text--darken-4'
      ]"
      :text="content"
      :length="500"
      v-else
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "vuex-class";
import { Prop } from "vue-property-decorator";

/* 
  Lazy load truncate/markdown because it does need to get imported
  if it is turned off in the settings.
*/
const VueMarkdown = () => import("vue-markdown-konishi");
const truncate = () => import("vue-truncate-collapsed");

@Component({
  components: {
    VueMarkdown,
    truncate
  }
})
export default class Content extends Vue {
  @Prop() content!: string;
  @Prop() highlight!: boolean;

  @Getter("markdown", { namespace: "settings" }) private markdown!: boolean;
}
</script>

<style lang="scss" scoped>
@import url(https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css);
</style>
