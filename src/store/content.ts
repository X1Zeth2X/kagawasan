// Post related interfaces/types.
interface Author {
  public_id: string;
  joined_date: string;
  full_name: string;
  username: string;
  email: string;
  roles: number[];

  bio: string | null;
  avatar: string | null;

  orientation: null;
  profile_picture: string | null;
  background_cover: string | null;
}

interface Note {
  author: Author;

  id: number;
  content: string;
  created: string;
  edited: boolean;

  liked: boolean;
  likes: number[];

  public_id: string;
  creator_public_id: string;
}

interface Post extends Note {
  status: string;
  image_url: string | null;

  comments: number[];
  initial_comments: Comment[] | null;
}

interface Comment extends Note {
  replies: number[];
  initial_replies: Note[] | null;
}

export { Author, Note, Post, Comment };
