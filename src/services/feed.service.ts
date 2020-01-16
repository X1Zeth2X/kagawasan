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
    const resource: string = `${backendUrl}/feed/get`;

    ApiService.setHeader();

    try {
      const apiResponse = await ApiService.get(resource);
      return apiResponse.data.post_ids;
    } catch (error) {
      throw new FeedError(error.response.message);
    }
  }, // Gets Post IDs

  async getPostsInfo(postIds: number[]) {
    const resource: string = `${backendUrl}/feed/get`;

    ApiService.setHeader();

    try {
      const apiResponse = await ApiService.post(resource, {
        post_ids: postIds
      });

      // Return information of posts
      return apiResponse.data.posts;
    } catch (error) {
      throw new FeedError(error.response.message);
    }
  } // Get Posts' information
};

export default FeedService;
export { FeedService, FeedError };
