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
  async get(replyPublicId: string) {
    const resource: string = `${backendUrl}/reply/get/${replyPublicId}`;

    ApiService.setHeader();

    try {
      const apiResponse = await ApiService.get(resource);
      return apiResponse.data.reply;
    } catch (error) {
      throw new ReplyError(error.response.data.message);
    }
  }, // Get specific reply

  async like(replyPublicId: string) {
    const resource: string = `${backendUrl}/like/reply/${replyPublicId}`;

    ApiService.setHeader();

    try {
      const apiResponse = await ApiService.post(resource, null);

      // Returns a boolean
      return apiResponse.data.success;
    } catch (error) {
      throw new ReplyError(error.response.data.message);
    }
  }, // Like reply

  async unlike(replyPublicId: string) {
    const resource: string = `${backendUrl}/like/reply/${replyPublicId}`;

    ApiService.setHeader();

    try {
      const apiResponse = await ApiService.delete(resource);

      // Returns a boolean
      return apiResponse.data.success;
    } catch (error) {
      throw new ReplyError(error.response.data.message);
    }
  }, // Unlike reply

  async create(commentPublicId: string, data: CreateData) {
    const resource: string = `${backendUrl}/reply/create/${commentPublicId}`;

    ApiService.setHeader();

    try {
      const apiResponse = await ApiService.post(resource, data);

      // Return newly created reply.
      return apiResponse.data.reply;
    } catch (error) {
      throw new ReplyError(error.response.data.message);
    }
  }, // Reply on a comment

  async update(content: string, replyPublicId: string) {
    const resource: string = `${backendUrl}/reply/update/${replyPublicId}`;

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

  async delete(replyPublicId: string) {
    const resource: string = `${backendUrl}/reply/delete/${replyPublicId}`;

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
