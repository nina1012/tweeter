/* eslint-disable no-restricted-imports */
import { useParams } from 'react-router-dom';

import { Spinner } from '@/components/ui/spinner';
import { UserBackground } from '@/components/ui/user/UserBackground';
import { UserHeader } from '@/components/ui/user/UserHeader';
import { useGetUserData } from '@/features/user/api/get-user-data';

export const ProfileRoute = () => {
  // using params in url to get userID
  const { userID } = useParams();
  const { userData, isLoadingUserData } = useGetUserData(userID as string);

  // here will be rendered skeleton for userData
  if (isLoadingUserData) {
    return (
      <div className="h-screen w-full items-center justify-center">
        <Spinner className="mx-auto"></Spinner>
      </div>
    );
  }
  return (
    <div className="min-h-svh">
      <UserBackground userID={userData?.user_id} />
      <div className="container">
        <UserHeader userID={userData?.user_id} />
      </div>
    </div>
  );
};
