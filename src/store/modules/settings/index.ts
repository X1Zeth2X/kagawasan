import { SettingState } from "./types";
import { RootState } from "@/store/types";
import { Module } from "vuex";

import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";

export const state: SettingState = {
  darkMode: true,
  showDrawer: true,
  miniDrawer: true,
  rightContent: true,

  markdown: false
};

const namespaced: boolean = true;

export const settings: Module<SettingState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
