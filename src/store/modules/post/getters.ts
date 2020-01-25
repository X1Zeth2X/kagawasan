import { GetterTree } from "vuex";
import { PostState } from "./types";
import { RootState } from "@/store/types";

export const getters: GetterTree<PostState, RootState> = {
  requesting(state): boolean {
    return state.requesting;
  },

  creating(state): boolean {
    return state.creating;
  },

  errorMsg(state): string | null {
    return state.errorMsg;
  },

  createErrorMsg(state): string | null {
    return state.createErrorMsg;
  }
};
