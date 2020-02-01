import ApiService, { backendUrl } from "./api.service";

class ReplyError extends Error {
  constructor(message: string) {
    super(message);

    this.name = this.constructor.name;
    this.message = message;
  }
}

interface CreateData {
  content: string;
  image_id: string | null;
}

const ReplyService = {
  async get(replyId: number) {
    const resource: string = `${backendUrl}/reply/get/${replyId}`;

    ApiService.setHeader();

    try {
      const apiResponse = await ApiService.get(resource);
      return apiResponse.data.reply;
    } catch (error) {
      throw new ReplyError(error.response.data.message);
    }
  }, // Get specific reply

  async like(replyId: number) {
    const resource: string = `${backendUrl}/like/reply/${replyId}`;

    ApiService.setHeader();

    try {
      const apiResponse = await ApiService.post(resource, null);

      // Returns a boolean
      return apiResponse.data.success;
    } catch (error) {
      throw new ReplyError(error.response.data.message);
    }
  }, // Like reply

  async unlike(replyId: number) {
    const resource: string = `${backendUrl}/like/reply/${replyId}`;

    ApiService.setHeader();

    try {
      const apiResponse = await ApiService.delete(resource);

      // Returns a boolean
      return apiResponse.data.success;
    } catch (error) {
      throw new ReplyError(error.response.data.message);
    }
  }, // Unlike reply

  async create(commentId: number, data: CreateData) {
    const resource: string = `${backendUrl}/reply/create/${commentId}`;

    ApiService.setHeader();

    try {
      const apiResponse = await ApiService.post(resource, data);

      // Return newly created reply.
      return apiResponse.data.reply;
    } catch (error) {
      throw new ReplyError(error.response.data.message);
    }
  }, // Reply on a comment

  async update(content: string, replyId: number) {
    const resource: string = `${backendUrl}/reply/update/${replyId}`;

    ApiService.setHeader();

    try {
      const apiResponse = await ApiService.put(resource, {
        content
      });

      // Return success boolean
      return apiResponse.data.success;
    } catch (error) {
      throw new ReplyError(error.response.data.message);
    }
  }, // Update reply

  async delete(replyId: number) {
    const resource: string = `${backendUrl}/reply/delete/${replyId}`;

    ApiService.setHeader();

    try {
      const apiResponse = await ApiService.delete(resource);

      // Returns true if succeeded.
      return apiResponse.data.success;
    } catch (error) {
      throw new ReplyError(error.response.data.message);
    }
  } // Delete reply
};

export default ReplyService;
export { ReplyService, ReplyError, CreateData };
