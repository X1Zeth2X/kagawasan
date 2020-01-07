import { LayoutState } from "./types";
import { RootState } from "@/store/types";
import { Module } from "vuex";

import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";

export const state: LayoutState = {
  showDrawer: true,
  miniDrawer: true,
  masonryLayout: false,
  animations: true
};

const namespaced: boolean = true;

export const themeLayout: Module<LayoutState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
