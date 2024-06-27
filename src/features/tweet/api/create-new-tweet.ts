import { InvalidateQueryFilters, useMutation } from '@tanstack/react-query';

import { useUser } from '@/features/auth/api/get-current-user';
import { queryClient } from '@/lib/react-query';
import { supabase } from '@/lib/supabase';

import { Tweet } from '../types';

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
  //    handling image and uploading to bucket
  //   let imageUrl = '';

  //   if (newTweet.image?.length) {
  //     // const fileType = newTweet.image[0].type.split('/').at(1);

  //     const imageName = `tweet_${Date.now()}_${newTweet.image[0]}`;

  //     imageUrl = `${import.meta.env.BASE_URL}${imageName}`;

  //     // console.log(
  //     //   'this image will be uploaded to tweet_images bucket',
  //     //   imageName,
  //     //   imageUrl,
  //     // );
  //   }

  const { data, error } = await supabase.rpc('add_new_tweet', {
    tweet_content: newTweet.content,
    tweet_image: newTweet.image,
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
