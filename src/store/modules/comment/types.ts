export interface PostState {
  commenting: boolean;
  requesting: boolean;

  errorMsg: string | null;
  commentErrorMsg: string | null;
}
