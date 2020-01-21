import { MutationTree } from "vuex";
import { DialogState } from "./types";

export const mutations: MutationTree<DialogState> = {
  toggleRegisterDialog(state) {
    state.registerDialog = !state.registerDialog;
  },
};
