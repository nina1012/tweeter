export type Tweet = {
  tweet_id?: string;
  image?: FileList;
  likes: string[];
  bookmarks: string[];
  content: string;
  is_reply: boolean;
  replies: [];
  hashtags: [];
  retweets: string[];
  is_retweet: boolean;
  created_at: Date;
  author_id: string;
  original_tweet_id?: string;
  original_author_id?: string;
};
