<template>
  <div ref="postContent">
    <vue-markdown
      ref="markdownContent"
      v-if="markdown"
      :source="content"
      :prerender="sanitize"
      :class="[
        $vuetify.theme.dark ? 'white--text' : 'grey--text text--darken-4',
        'content',
        { more: showMore }
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

    <v-btn
      block
      text
      small
      v-show="showMoreIndicator && markdown"
      color="primary"
      @click="toggleMoreContent"
      class="mt2"
    >
      Show More
      <v-icon class="ml2" small>ion-ios-arrow-dropdown</v-icon>
    </v-btn>
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
const DOMPurify = require("dompurify");

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

  private showMore: boolean = false;
  private showMoreIndicator: boolean = false;

  $refs!: {
    postContent: HTMLDivElement;
  };

  private mounted() {
    setTimeout(() => {
      if (this.$refs.postContent.offsetHeight >= 140) {
        this.showMoreIndicator = true;
      }
    }, 250);
  }

  private toggleMoreContent() {
    this.showMore = true;
    this.showMoreIndicator = false;
  }

  private sanitize(content: string) {
    const sanitizedContent: string = DOMPurify.sanitize(content);
    return sanitizedContent;
  }
}
</script>

<style lang="scss" scoped>
@import url(https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css);

.content {
  max-height: 10em;
  overflow: hidden;

  &.more {
    max-height: 100%;
  }
}
</style>
