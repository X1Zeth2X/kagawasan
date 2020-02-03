import ApiService, { backendUrl } from "./api.service";

class FeedError extends Error {
  constructor(message: string) {
    super(message);

    this.name = this.constructor.name;
    this.message = message;
  }
}

const FeedService = {
  async getIds() {
    const resource: string = `${backendUrl}/feed/posts`;

    ApiService.setHeader();

    try {
      const apiResponse = await ApiService.get(resource);
      return apiResponse.data.post_ids;
    } catch (error) {
      throw new FeedError(error.response.data.message);
    }
  }, // Gets Post IDs

  async getPostsData(postIds: number[]) {
    const resource: string = `${backendUrl}/feed/posts`;

    ApiService.setHeader();

    try {
      const apiResponse = await ApiService.post(resource, {
        post_ids: postIds
      });

      // Return data of posts
      return apiResponse.data.posts;
    } catch (error) {
      throw new FeedError(error.response.data.message);
    }
  }, // Get Posts' data

  async getCommentsData(commentIds: number[]) {
    const resource: string = `${backendUrl}/feed/comments`;

    ApiService.setHeader();

    try {
      const apiResponse = await ApiService.post(resource, {
        comment_ids: commentIds
      });

      // Return data of comments
      return apiResponse.data.comments;
    } catch (error) {
      throw new FeedError(error.response.data.message);
    }
  } // Get Comments' data
};

export default FeedService;
export { FeedService, FeedError };
