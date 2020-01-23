import { ActionTree } from "vuex";
import { DialogState } from "./types";
import { RootState } from "@/store/types";

export const actions: ActionTree<DialogState, RootState> = {
  toggleRegisterDialog({ commit }) {
    commit("toggleRegisterDialog");
  },

  toggleEditDialog({ commit }) {
    commit("toggleEditDialog");
  },

  setEditPost(
    { commit },
    { content, postPublicId }: { content: string; postPublicId: string }
  ) {
    // Set the post that is being edited.
    commit("setEditPost", { content, postPublicId });
  }
};
