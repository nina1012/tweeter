export type Tweet = {
  tweet_id?: string;
  image?: FileList | string;
  likes: [];
  saves: [];
  content: string;
  is_reply: boolean;
  replies: [];
  hashtags: [];
  retweets: [];
  is_retweet: boolean;
  created_at: Date;
  author_id: string;
};
