import { useGetUserData } from '@/features/user/api/get-user-data';

type UserBackgroundProps = {
  userID: string;
};
export const UserBackground = ({ userID }: UserBackgroundProps) => {
  const { userData } = useGetUserData(userID);

  return (
    <div className="pointer-events-none -mt-8 h-72">
      <img
        src={
          userData?.background_image ||
          'https://downtownpensacola.com/static/img/defaultbanner.jpg'
        }
        alt="Background"
        className="h-72 w-full object-cover object-center"
      />
    </div>
  );
};
