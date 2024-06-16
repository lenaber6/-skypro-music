type userType = {
id: number,
username: string,
first_name: string,
last_name: string,
email: string,
}
export type trackType = {
        track: string;
        id: number,
        name: string,
        author: string,
        release_date: string,
        genre: string,
        duration_in_seconds: number,
        album: string,
        logo: string | null,
        track_file: string,
        stared_user: userType[],
}
export type ErrorType = {
    error: Error;
    reset: () => void;
  }