import { ActionTree } from "vuex";
import { DialogState } from "./types";
import { RootState } from "@/store/types";

export const actions: ActionTree<DialogState, RootState> = {
  toggleRegisterDialog({ commit }) {
    commit("toggleRegisterDialog");
  },

  toggleSnack({ commit }, snackMsg: string | null) {
    commit("toggleSnack", snackMsg);
  }
};
