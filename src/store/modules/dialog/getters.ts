import { GetterTree } from "vuex";
import { DialogState } from "./types";
import { RootState } from "@/store/types";

export const getters: GetterTree<DialogState, RootState> = {
  registerDialog(state): boolean {
    return state.registerDialog;
  },

  editDialog(state): boolean {
    return state.editDialog;
  },

  editPost(state): object {
    return {
      content: state.editPost.content,
      postPublicId: state.editPost.postPublicId
    };
  },

  snackNotifier(state): object {
    return {
      change: state.snackNotifier.change,
      message: state.snackNotifier.message,
      color: state.snackNotifier.color
    };
  }
};
