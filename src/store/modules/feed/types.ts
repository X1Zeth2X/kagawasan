export interface FeedState {
  feedItems: object[];
  postIds: number[];

  requesting: boolean;
  error: boolean;
  feedErrorMsg: string;

  commentsRequest: boolean;
  commentsFeedErrorMsg: string | null;

  repliesRequest: boolean;
  repliesFeedErrorMsg: string | null;
}
