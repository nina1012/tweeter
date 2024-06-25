export type Tweet = {
  tweet_id: string;
  image?: string;
  likes: [];
  saves: [];
  content: string;
  isReply: boolean;
  replies: [];
  hashtags: [];
  retweets: [];
  isRetweet: boolean;
  created_at: Date;
  author_id: string;
};
