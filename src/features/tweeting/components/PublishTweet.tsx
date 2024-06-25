import { useForm } from 'react-hook-form';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/features/auth/api/get-current-user';
import { useGetUserData } from '@/features/user/api/get-user-data';

import { PublishTweetInput } from './PublishTweetInput';

export const PublishTweet = () => {
  const { user } = useUser();
  const { userData } = useGetUserData(user?.id as string);
  const { register } = useForm();

  return (
    <div className="w-full rounded-md bg-white px-5 py-2 shadow-md">
      <h3 className="mb-3 border-b-[0.1rem] border-b-gray-200 pb-2 text-xs font-semibold tracking-tighter text-gray-700">
        Tweet something
      </h3>
      <form className="grid min-h-24 grid-cols-[3.5rem,1fr] grid-rows-[auto,auto]">
        <Avatar className="size-11 rounded-md">
          <AvatarImage
            src={userData?.avatar_image}
            className="size-full !rounded-md object-cover object-center"
          />
        </Avatar>
        <div className="">
          <PublishTweetInput register={register} />
        </div>
      </form>
    </div>
  );
};
