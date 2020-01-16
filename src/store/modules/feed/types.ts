export interface FeedState {
  feedItems: object[];
  postIds: number[];

  requesting: boolean;
  error: boolean;
  feedErrorMsg: string;
}