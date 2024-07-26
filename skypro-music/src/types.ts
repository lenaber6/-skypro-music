export type userType = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
};
export type trackType = {
  track: string;
  id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string;
  duration_in_seconds: number;
  album: string;
  logo: string | null;
  track_file: string;
  stared_user: userType[];
  isFavourite: boolean;
  isLiked: boolean;
};
export type ErrorType = {
  error: Error;
  reset: () => void;
};

export type TokenType = {
  access: string;
  refresh: string;
};

export type UserContextType = {
  user: userType | null;

  token?: TokenType;
  login: (
    newUser: number,
    loginData: { email: string; password: string }
  ) => void;
  logout: () => void;
};

export type SigninFormType = {
  email: string;
  password: string;
};
