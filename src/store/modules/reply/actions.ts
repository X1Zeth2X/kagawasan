import ReplyService, { ReplyError } from "@/services/reply.service";
import { Note } from "@/store/content";
import { RootState } from "@/store/types";
import { ActionTree } from "vuex";
import { PostState } from "./types";

export const actions: ActionTree<PostState, RootState> = {
  async get({ commit }, replyPublicId: string) {
    commit("request");

    try {
      const reply: Note = await ReplyService.get(replyPublicId);
      commit("requestSuccess");

      // Return requested reply.
      return reply;
    } catch (error) {
      if (error instanceof ReplyError) {
        commit("requestError", error.message);
      }

      return false;
    }
  }, // Get specific reply

  async like({ commit }, replyPublicId: string) {
    commit("request");

    try {
      const liked: boolean = await ReplyService.like(replyPublicId);
      commit("requestSuccess");

      return liked;
    } catch (error) {
      if (error instanceof ReplyError) {
        commit("requestError", error.message);
      }

      return false;
    }
  }, // Like reply

  async unlike({ commit }, replyPublicId: string) {
    commit("request");

    try {
      const unliked: boolean = await ReplyService.unlike(replyPublicId);
      commit("requestSuccess");

      return unliked;
    } catch (error) {
      if (error instanceof ReplyError) {
        commit("requestError", error.message);
      }

      return false;
    }
  }, // Unlike reply

  async create({ commit }, { commentPublicId, data }) {
    commit("replyRequest");

    try {
      const reply: Note = await ReplyService.create(commentPublicId, data);
      commit("replySuccess");

      // Return newly created reply.
      return reply;
    } catch (error) {
      if (error instanceof ReplyError) {
        commit("replyError", error.message);
      }

      return false;
    }
  }, // Reply on a comment

  async update({ commit }, { content, replyPublicId }) {
    commit("request");

    try {
      const apiResp: boolean = await ReplyService.update(
        content,
        replyPublicId
      );
      commit("requestSuccess");

      // Return a response that it has been updated.
      return apiResp;
    } catch (error) {
      if (error instanceof ReplyError) {
        commit("requestError", error.message);
      }

      return false;
    }
  },

  async delete({ commit }, replyPublicId: string) {
    commit("request");

    try {
      const isDeleted: boolean = await ReplyService.delete(replyPublicId);
      commit("requestSuccess");

      // Return true if the reply was deleted.
      return isDeleted;
    } catch (error) {
      if (error instanceof ReplyError) {
        commit("requestError", error.message);
      }

      return false;
    }
  } // Delete a reply
};
