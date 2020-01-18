import ApiService, { backendUrl } from "./api.service";

class PostError extends Error {
  constructor(message: string) {
    super(message);

    this.name = this.constructor.name;
    this.message = message;
  }
}

interface CreateData {
  content: string;
  image_id: string;
}

const PostService = {
  async get(postPublicId: string) {
    const resource: string = `${backendUrl}/post/get/${postPublicId}`;

    ApiService.setHeader();

    try {
      const apiResponse = await ApiService.get(resource);
      return apiResponse.data.post;
    } catch (error) {
      throw new PostError(error.response.message);
    }
  },

  async create(data: CreateData) {
    const resource: string = `${backendUrl}/post/create`;

    ApiService.setHeader();

    try {
      const apiResponse = await ApiService.post(resource, data)

      // Return newly created post.
      return apiResponse.data.post;
    } catch (error) {
      throw new PostError(error.response.data.message);
    }
  },

  async delete(postPublicId: string) {
    const resource: string = `${backendUrl}/post/delete/${postPublicId}`;

    ApiService.setHeader();

    try {
      const apiResponse = await ApiService.delete(resource);
      // Returns true if succeeded.
      return apiResponse.data.success;
    } catch (error) {
      throw new PostError(error.response.message);
    }
  }
}

export default PostService;
export { PostService, PostError, CreateData };
