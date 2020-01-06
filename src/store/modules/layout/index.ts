import { LayoutState } from './types';
import { RootState } from '@/store/types';
import { Module } from 'vuex';

import { mutations } from './mutations';

export const state: LayoutState = {
  miniDrawer: true,
  masonryLayout: false,
}

const namespaced: boolean = true;

export const layout: Module<LayoutState, RootState> = {
  namespaced,
  state,
  mutations
}