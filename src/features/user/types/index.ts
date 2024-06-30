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

export type UpdatedUser = {
  avatar_image?: string;
  background_image?: string;
  bio?: string;
  username?: string;
};
