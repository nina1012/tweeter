/* eslint-disable jsx-a11y/label-has-associated-control */
import { Image } from 'lucide-react';
import { FieldError } from 'react-hook-form';
import { z } from 'zod';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { PublishTweetSkeleton } from '@/components/ui/skeleton/home/PublishTweetSkeleton';
import { Spinner } from '@/components/ui/spinner';
import { useUser } from '@/features/auth/api/get-current-user';
import { useGetUserData } from '@/features/user/api/get-user-data';

import { useCreateTweet } from '../api/create-new-tweet';
import { Tweet } from '../types';

import { PublishTweetInput } from './PublishTweetInput';

const publishTweetSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  image: z.instanceof(FileList).optional(),
  // hashtags: z.array(z.string()).optional(), // Assuming array of strings
});

export const PublishTweet = () => {
  const { user } = useUser();
  const { userData, isLoadingUserData } = useGetUserData(user?.id as string);
  const { addNotification } = useNotifications();

  const { createTweet, creatingTweet } = useCreateTweet({
    onSuccess: () => {
      addNotification({
        title: 'Tweet is created',
        type: 'success',
      });
    },
    onError: (error: string) => {
      addNotification({
        title: 'Error',
        type: 'error',
        message: error,
      });
    },
  });
  if (!user) return null;

  if (isLoadingUserData) {
    return <PublishTweetSkeleton />;
  }

  return (
    <div className="mb-4 w-full rounded-md bg-white px-5 py-2 shadow-md">
      <h3 className="mb-3 border-b-[0.1rem] border-b-gray-200 pb-2 text-xs font-semibold tracking-tighter text-gray-700">
        Tweet something
      </h3>
      <Form
        onSubmit={(values) => {
          const tweet: Tweet = {
            ...values,
            likes: [],
            saves: [],
            is_reply: false,
            replies: [],
            retweets: [],
            is_retweet: false,
            created_at: new Date(),
            author_id: user.id,
            hashtags: [],
          };
          console.log(values, tweet.image);

          createTweet(tweet);
        }}
        schema={publishTweetSchema}
        className="!mt-0 grid min-h-24 grid-cols-[3.5rem,1fr] grid-rows-[auto,auto]"
      >
        {({ register, formState }) => {
          return (
            <>
              <div>
                <Avatar className="size-11 rounded-md">
                  <AvatarImage
                    src={userData?.avatar_image}
                    className="size-full !rounded-md object-cover object-center"
                  />
                </Avatar>
              </div>
              <div className="!m-0">
                <PublishTweetInput
                  registration={register('content')}
                  error={formState.errors.content as FieldError}
                />
              </div>
              {/* buttons */}
              <div></div>
              <div className="flex items-center justify-between ">
                <div className="flex items-center">
                  <label htmlFor="tweet-image" className="cursor-pointer ">
                    <Input
                      id="tweet-image"
                      registration={register('image')}
                      error={formState.errors.image as FieldError}
                      type="file"
                      className="hidden"
                    />
                    <Image
                      size={20}
                      className="text-stone-300 transition-colors hover:text-primary"
                    />
                  </label>
                </div>
                <div>
                  <Button type="submit" className="min-w-28">
                    {creatingTweet ? (
                      <>
                        <Spinner className="mr-2 text-white" size="sm" />{' '}
                        <span>tweeting</span>
                      </>
                    ) : (
                      <span>tweet</span>
                    )}
                  </Button>
                </div>
              </div>
            </>
          );
        }}
      </Form>
    </div>
  );
};
