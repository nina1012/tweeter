import { InvalidateQueryFilters, useMutation } from '@tanstack/react-query';

import { useUser } from '@/features/auth/api/get-current-user';
import { queryClient } from '@/lib/react-query';
import { supabase } from '@/lib/supabase';

import { Tweet } from '../types';

import { uploadImage } from './upload-image';

export type useCreateTweetOptions = {
  onSuccess?: () => void;
  onError?: (error: any) => void;
};

type createTweetFnProps = {
  userID: string;
  newTweet: Tweet;
};

export const createTweetFn = async ({
  userID,
  newTweet,
}: createTweetFnProps): Promise<Tweet | null> => {
  if (!newTweet) return null;
  // handling image and uploading to bucket if image has been selected

  if (newTweet.image && newTweet.image.length > 0) {
    const imageFile = newTweet.image.item(0);
    if (imageFile) {
      const imageName = imageFile.name;

      await uploadImage({
        image: imageFile,
        imageName,
        bucketName: 'tweet_images',
      });
    }
  }
  const { data, error } = await supabase.rpc('add_new_tweet', {
    tweet_content: newTweet.content,
    tweet_image: newTweet?.image?.item(0)?.name,
    user_id: userID,
    is_reply: false,
    is_retweet: false,
  });

  if (error) throw new Error(error.message);
  return data;
};

export const useCreateTweet = ({
  onSuccess,
  onError,
}: useCreateTweetOptions) => {
  const { user } = useUser();

  const {
    mutate: createTweet,
    isPending: creatingTweet,
    error: errorCreateTweet,
  } = useMutation({
    mutationFn: (newTweet: Tweet) =>
      createTweetFn({ newTweet, userID: user?.id as string }),
    onSuccess: () => {
      queryClient.invalidateQueries([
        'user',
        user?.id,
      ] as InvalidateQueryFilters);
      onSuccess?.();
    },
    onError: (error) => {
      throw new Error(error.message);
      onError?.(error);
    },
  });

  return { createTweet, creatingTweet, errorCreateTweet };
};
