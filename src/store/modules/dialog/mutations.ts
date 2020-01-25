import { MutationTree } from "vuex";
import { DialogState } from "./types";

export const mutations: MutationTree<DialogState> = {
  toggleRegisterDialog(state) {
    state.registerDialog = !state.registerDialog;
  },

  toggleEditDialog(state) {
    state.editDialog = !state.editDialog;
  },

  setEditPost(
    state,
    { content, postPublicId }: { content: string; postPublicId: string }
  ) {
    state.editPost.content = content;
    state.editPost.postPublicId = postPublicId;
  },

  setSnackNotifier(state, { color, message }) {
    state.snackNotifier.change = !state.snackNotifier.change;
    state.snackNotifier.color = color;
    state.snackNotifier.message = message;
  }
};
