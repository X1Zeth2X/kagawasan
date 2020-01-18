import { GetterTree } from 'vuex';
import { PostState } from './types';
import { RootState } from '@/store/types';

export const getters: GetterTree<PostState, RootState> = {
  requesting(state): boolean {
    return state.requesting;
  },

  error(state): boolean {
    return state.error;
  },

  errorMsg(state): string {
    return state.errorMsg;
  }
}