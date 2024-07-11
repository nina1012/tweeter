import { InvalidateQueryFilters, useMutation } from '@tanstack/react-query';

import { useUser } from '@/features/auth/api/get-current-user';
import { queryClient } from '@/lib/react-query';
import { supabase } from '@/lib/supabase';

import { deleteImage } from './tweet-images-func';

export const deleteTweet = async ({
  tweetID,
  originalAuthorID,
}: {
  tweetID: string;
  originalAuthorID: string;
}): Promise<void> => {
  const { data, error } = await supabase.rpc('delete_tweet', {
    tweet_id: tweetID,
    original_author_id: originalAuthorID,
  });

  if (error) throw new Error(error.message);
  //   this function returns an array of deleted tweets in this format, but I kept this function returning void to not deal with new types :)
  // { "deleted_tweet_id": "deleted_tweet_id", "deleted_author_id": "deleted_author_id,"deleted_content": "deleted_content", "deleted_image": "","deleted_created_at":"deleted_created_at"}

  // delete image from tweet_images bucket
  const { deleted_image } = data[0];
  console.log(data[0], ' deleted tweet');
  deleteImage({ imageURL: deleted_image, bucketName: 'tweet_images' });
};

type DeleteTweetVariables = {
  tweetID: string;
  originalAuthorID?: string;
};

export const useDeleteTweet = () => {
  const { user } = useUser();
  const {
    mutate: removeTweet, // because of the name collision
    isPending: isPendingDeletingTweet,
    error: errorDeletingTweet,
  } = useMutation<void, Error, DeleteTweetVariables>({
    mutationFn: async ({ tweetID }) => {
      if (!user?.id) throw new Error('User is not logged in');
      await deleteTweet({ tweetID, originalAuthorID: user.id });
    },
    onSettled: () => {
      queryClient.invalidateQueries('user' as InvalidateQueryFilters);
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { removeTweet, isPendingDeletingTweet, errorDeletingTweet };
};
