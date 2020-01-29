import { ActionTree } from "vuex";
import { PostState } from "./types";
import { RootState } from "@/store/types";
import CommentService, { CommentError, CreateData } from '@/services/comment.service';
import { Comment } from "@/store/post";

export const actions: ActionTree<PostState, RootState> = {
  async get({ commit }, commentId: number) {
    commit("request");

    try {
      const comment: Comment = await CommentService.get(commentId);
      commit("requestSuccess");

      // Return requested post.
      return comment;
    } catch (error) {
      if (error instanceof CommentError) {
        commit("requestError", error.message);
      }

      return false;
    }
  }, // Get specific comment

  async like({ commit }, commentId: number) {
    commit("request");

    try {
      const liked: boolean = await CommentService.like(commentId);
      commit("requestSuccess");

      return liked;
    } catch (error) {
      if (error instanceof CommentError) {
        commit("requestError", error.message);
      }

      return false;
    }
  }, // Like comment

  async unlike({ commit }, commentId: number) {
    commit("request");

    try {
      const unliked: boolean = await CommentService.unlike(commentId);
      commit("requestSuccess");

      return unliked;
    } catch (error) {
      if (error instanceof CommentError) {
        commit("requestError", error.message);
      }

      return false;
    }
  }, // Unlike comment

  async create({ commit }, {postPublicId, data}) {
    commit("commentRequest");

    try {
      const comment: Comment = await CommentService.create(postPublicId, data);
      commit("commentSuccess");

      // Return newly created post.
      return comment;
    } catch (error) {
      if (error instanceof CommentError) {
        commit("commentError", error.message);
      }

      return false;
    }
  }, // Comment on a post

  async update({ commit }, { content, commentId }) {
    commit("request");

    try {
      const apiResp: boolean = await CommentService.update(content, commentId);
      commit("requestSuccess");

      // Return a response that it has been updated.
      return apiResp;
    } catch (error) {
      if (error instanceof CommentError) {
        commit("requestError", error.message);
      }

      return false;
    }
  },

  async delete({ commit }, commentId: number) {
    commit("request");

    try {
      const isDeleted: boolean = await CommentService.delete(commentId);
      commit("requestSuccess");

      // Return true if the comment was deleted.
      return isDeleted;
    } catch (error) {
      if (error instanceof CommentError) {
        commit("requestError", error.message);
      }

      return false;
    }
  } // Delete a comment
};
