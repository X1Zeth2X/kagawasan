import { GetterTree } from "vuex";
import { PostState } from "./types";
import { RootState } from "@/store/types";

export const getters: GetterTree<PostState, RootState> = {
  requesting(state): boolean {
    return state.requesting;
  },

  replying(state): boolean {
    return state.replying;
  },

  errorMsg(state): string | null {
    return state.errorMsg;
  },

  replyErrorMsg(state): string | null {
    return state.replyErrorMsg;
  }
};
