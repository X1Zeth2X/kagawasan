interface AuthState {
  authenticating: boolean;
  registering: boolean;
  error: boolean;

  accessToken: string;
  currentUser: User | any;

  authErrorCode: number;
  authError: string;
}

interface RegisterData {
  email: string;
  password: string;
  entry_key: string;
  // Add more
}

interface User {
  username: string;
  public_id: string;
  email: string;

  bio: string | null;
  full_name: string;
  profile_picture: string | null;
  avatar: string | null;
  joined_date: Date;

  roles: number[];
  comment_likes: number[];
  post_likes: number[];
  reply_likes: number[];
}

export { AuthState, User };
