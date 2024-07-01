export type User = {
  username: string;
  bio: string;
  retweets: [];
  replies: [];
  likes: [];
  following_count: number;
  following: [];
  followers_count: number;
  followers: [];
  bookmarks: [];
  background_image: string;
  avatar_image: string;
  created_at: Date;
  email: string;
  firstName: string;
  lastName: string;
  user_id: string;
};

//  testing
// these types for avatar and bg image are different type than User type
// FileList because of the input type="file"

export type UpdatedUser = {
  avatar_image?: string | FileList;
  background_image?: string | FileList;
  bio?: string;
  username?: string;
};
