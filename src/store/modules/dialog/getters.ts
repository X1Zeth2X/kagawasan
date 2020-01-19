import { GetterTree } from "vuex";
import { DialogState } from "./types";
import { RootState } from "@/store/types";

export const getters: GetterTree<DialogState, RootState> = {
  registerDialog(state) {
    return state.registerDialog;
  },

  snack(state): object {
    return {
      show: state.snack,
      message: state.snackMsg
    }
  }


};
