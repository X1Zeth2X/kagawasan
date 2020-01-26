export interface PostState {
  creating: boolean;
  requesting: boolean;

  errorMsg: string | null;
  createErrorMsg: string | null;
}
