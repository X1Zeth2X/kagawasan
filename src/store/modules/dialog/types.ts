export interface DialogState {
  registerDialog: boolean;
  editDialog: boolean;

  editPost: {
    content: string | null;
    postPublicId: string | null;
  };
}
