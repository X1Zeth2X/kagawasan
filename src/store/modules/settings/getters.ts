import { GetterTree } from "vuex";
import { SettingState } from "./types";
import { RootState } from "@/store/types";

export const getters: GetterTree<SettingState, RootState> = {
  miniDrawer(state): boolean {
    return state.miniDrawer;
  },

  showDrawer(state): boolean {
    return state.showDrawer;
  },

  markdown(state): boolean {
    return state.markdown;
  },

  rightContent(state): boolean {
    return state.rightContent;
  },

  darkMode(state): boolean {
    return state.darkMode;
  }
};
