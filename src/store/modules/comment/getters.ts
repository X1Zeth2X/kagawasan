import { GetterTree } from "vuex";
import { PostState } from "./types";
import { RootState } from "@/store/types";

export const getters: GetterTree<PostState, RootState> = {
  requesting(state): boolean {
    return state.requesting;
  },

  commenting(state): boolean {
    return state.commenting;
  },

  errorMsg(state): string | null {
    return state.errorMsg;
  },

  commentErrorMsg(state): string | null {
    return state.commentErrorMsg;
  }
};
