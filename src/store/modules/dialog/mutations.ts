import { MutationTree } from "vuex";
import { DialogState } from "./types";
import { Post } from '@/store/post';

export const mutations: MutationTree<DialogState> = {
  toggleRegisterDialog(state) {
    state.registerDialog = !state.registerDialog;
  },

  toggleEditDialog(state) {
    state.editDialog = !state.editDialog;
  },

  setEditPost(state, post: Post) {
    state.editPost = post;
  }
};
