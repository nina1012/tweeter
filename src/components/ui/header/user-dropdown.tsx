import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { ChevronDown, CircleUserRound, LogOut, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/features/auth/api/get-current-user';
import { useLogout } from '@/features/auth/api/logout';
import { useGetUserData } from '@/features/user/api/get-user-data';

import { Button } from '../button';
import { useNotifications } from '../notifications';
import { Skeleton } from '../skeleton/skeleton';

export const UserDropdown = () => {
  const { user } = useUser();
  const { userData } = useGetUserData(user?.id as string);

  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const { logout } = useLogout({
    onSuccess: () => {
      navigate('/');
      addNotification({
        type: 'success',
        title: 'Successfully logged out',
      });
    },
    onError: () => {
      addNotification({
        type: 'error',
        title: 'Error while trying to log out',
      });
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="min-w-40 cursor-pointer rounded-md p-1 py-2 hover:bg-muted"
      >
        <div className="flex items-center justify-center gap-2">
          {!user ? (
            // skeleton for avatar and username
            <div className="flex w-full items-center justify-between">
              <Skeleton className="size-8 rounded-md" />
              <Skeleton className="ml-2 h-6 w-2/3" />
            </div>
          ) : (
            <>
              <div className="flex size-8 items-center justify-center overflow-hidden rounded-md transition-colors">
                <Avatar>
                  <AvatarImage
                    src={userData?.avatar_image}
                    className="size-8 object-cover object-center"
                    alt="Avatar image"
                  />
                </Avatar>
              </div>
              {userData?.username}
            </>
          )}
          <ChevronDown size="16" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[1000] w-56 opacity-100">
        <DropdownMenuLabel className="font-bold">My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <Link to={`/app/${user?.id}`}>
            <DropdownMenuItem className="flex gap-3">
              <CircleUserRound />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <Link to="/app/settings">
            <DropdownMenuItem className="flex gap-3">
              <Settings />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-2">
          <Button
            variant="ghost"
            className="flex gap-3 px-1"
            onClick={() => logout()}
          >
            <LogOut color="#d11f1f" strokeWidth={1.5} />
            <span className="text-red-500">Log out</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
