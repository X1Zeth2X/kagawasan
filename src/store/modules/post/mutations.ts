import { MutationTree } from 'vuex';
import { PostState } from './types';

export const mutations: MutationTree<PostState> = {
  postRequest(state) {
    state.requesting = true;
    state.error = false;
    state.errorMsg = "";
  },

  postError(state, errorMsg: string) {
    state.requesting = false;
    state.error = true
    state.errorMsg = errorMsg;
  }
}