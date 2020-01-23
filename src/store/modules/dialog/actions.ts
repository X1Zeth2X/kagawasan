import { ActionTree } from "vuex";
import { DialogState } from "./types";
import { RootState } from "@/store/types";
import { Post } from '@/store/post';

export const actions: ActionTree<DialogState, RootState> = {
  toggleRegisterDialog({ commit }) {
    commit("toggleRegisterDialog");
  },

  toggleEditDialog({ commit }) {
    commit("toggleEditDialog");
  },

  setEditPost({ commit }, post: Post) {
    // Set the post that is being edited.
    commit("setEditPost", post);
  }
};
