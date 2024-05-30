/* eslint-disable no-restricted-imports */
import { useUser } from '@/features/auth/api/get-current-user';

export const ProfileRoute = () => {
  const { user } = useUser();
  return (
    <div>
      <h1>Hello {user?.email}</h1>
    </div>
  );
};
