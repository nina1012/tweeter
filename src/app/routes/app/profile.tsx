/* eslint-disable no-restricted-imports */
import { Spinner } from '@/components/ui/spinner';
import { useUser } from '@/features/auth/api/get-current-user';
import { useGetUserData } from '@/features/user/api/get-user-data';

export const ProfileRoute = () => {
  const { user, isLoadingUser } = useUser();
  const { userProfile, isLoadingUserProfile } = useGetUserData(
    user?.id as string,
  );

  // here will be rendered skeletal for UserProfile
  if (isLoadingUser || isLoadingUserProfile) {
    return (
      <div className="h-screen w-full items-center justify-center">
        <Spinner className="mx-auto"></Spinner>
      </div>
    );
  }
  return (
    <div className="container">
      <h1>Hello {userProfile?.firstName}</h1>
    </div>
  );
};
