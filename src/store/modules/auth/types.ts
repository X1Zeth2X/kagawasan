interface AuthState {
  authenticating: boolean;
  registering: boolean;

  accessToken: string;
  currentUser: User | any;

  error: boolean;
  errorMsg: string;
}

interface User {
  username: string;
  public_id: string;
  email: string;

  // Media
  zavatar: string | null;
  background_cover: string | null;
  bio: string | null;

  full_name: string;
  orientation: string;
  joined_date: string;
  roles: number[];
}

export { AuthState, User };
