import { ActionTree } from "vuex";
import { PostState } from "./types";
import { RootState } from "@/store/types";
import PostService, { PostError, CreateData } from "@/services/post.service";
import { Post } from "@/store/post";

export const actions: ActionTree<PostState, RootState> = {
  async get({ commit }, postPublicId: string) {
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

  async like({ commit }, postPublicId: string) {
    commit("postRequest");

    try {
      const liked: boolean = await PostService.like(postPublicId);

      return liked;
    } catch (error) {
      if (error instanceof PostError) {
        commit("postError", error.message);
      }

      return false;
    }
  }, // Like post

  async unlike({ commit }, postPublicId: string) {
    commit("postRequest");

    try {
      const unliked: boolean = await PostService.unlike(postPublicId);

      return unliked;
    } catch (error) {
      if (error instanceof PostError) {
        commit("postError", error.message);
      }

      return false;
    }
  }, // Unlike post

  async create({ commit }, data: CreateData) {
    commit("postRequest");

    try {
      const post = await PostService.create(data);

      // Return newly created post.
      return post;
    } catch (error) {
      if (error instanceof PostError) {
        commit("postError", error.message);
      }

      return false;
    }
  }, // Create a new post

  async delete({ commit }, postPublicId: string) {
    commit("postRequest");

    try {
      const isDeleted: boolean = await PostService.delete(postPublicId);

      // Return true if the post was deleted.
      return isDeleted;
    } catch (error) {
      if (error instanceof PostError) {
        commit("postError", error.message);
      }

      return false;
    }
  } // Delete a post
};
