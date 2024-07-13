export type Tweet = {
  tweet_id?: string;
  image?: FileList;
  likes: string[];
  saves: [];
  content: string;
  is_reply: boolean;
  replies: [];
  hashtags: [];
  retweets: [];
  is_retweet: boolean;
  created_at: Date;
  author_id: string;
  original_tweet_id?: string;
  original_author_id?: string;
};
