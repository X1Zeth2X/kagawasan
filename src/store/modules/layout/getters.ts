import { GetterTree } from 'vuex';
import { LayoutState } from './types';
import { RootState } from '@/store/types';

export const getters: GetterTree<LayoutState, RootState> = {
  miniDrawer(state): boolean {
    return state.miniDrawer;
  },

  masonryLayout(state): boolean {
    return state.masonryLayout;
  }
}