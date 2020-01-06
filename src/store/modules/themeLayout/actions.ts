import { ActionTree } from "vuex";
import { RootState } from "@/store/types";
import { LayoutState } from "./types";

export const actions: ActionTree<LayoutState, RootState> = {
  toggleMiniDrawer({ commit }) {
    commit("toggleMiniDrawer");
  },

  toggleMasonryLayout({ commit }) {
    commit("toggleMasonryLayout");
  },

  toggleDrawer({ commit }) {
    commit("toggleDrawer");
  }
};
