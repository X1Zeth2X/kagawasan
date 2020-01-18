import { ActionTree } from 'vuex';
import { PostState } from './types';
import { RootState } from '@/store/types';
import PostService, { PostError, CreateData } from '@/services/post.service';
import { Post } from '@/store/post';

export const actions: ActionTree<PostState, RootState> = {
  async get({commit}, postPublicId: string) {
    commit("postRequest");

    try {
      const post: Post = await PostService.get(postPublicId);

      // Return requested post.
      return post;
    } catch (error) {
      if (error instanceof PostError) {
        commit("postError", error.message);
      }

      return false;
    }
  }, // Get specific post

  async create({ commit }, data: CreateData) {
    commit("postRequest");

    try {
      const post = await PostService.create(data);

      // Return newly created post.
      return post
    } catch (error) {
      if (error instanceof PostError) {
        commit("postError", error.message);
      }

      return false;
    }
  }, // Create a new post

  async delete({commit}, postPublicId: string) {
    commit("postRequest");

    try {
      const isDeleted = await PostService.delete(postPublicId);

      return isDeleted;
    } catch (error) {
      if (error instanceof PostError) {
        commit("postError", error.message);
      }

      return false;
    }
  } // Delete a post
}