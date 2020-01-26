export interface DialogState {
  registerDialog: boolean;
  editDialog: boolean;

  editPost: {
    content: string | null;
    postPublicId: string | null;
  };

  snackNotifier: {
    // Change simply indicates that something happened this is for the @Watcher.
    change: boolean;
    message: string | null;
    color: string;
  };
}
