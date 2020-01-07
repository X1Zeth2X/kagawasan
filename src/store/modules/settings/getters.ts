import { GetterTree } from "vuex";
import { SettingState } from "./types";
import { RootState } from "@/store/types";

export const getters: GetterTree<SettingState, RootState> = {
  miniDrawer(state): boolean {
    return state.miniDrawer;
  },

  masonryLayout(state): boolean {
    return state.masonryLayout;
  },

  showDrawer(state): boolean {
    return state.showDrawer;
  }
};
