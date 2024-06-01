/* eslint-disable no-restricted-imports */
import { CircleUserRound, LogOut, Settings, User } from 'lucide-react';
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

import { Button } from '../button';
import { useNotifications } from '../notifications';
import { Skeleton } from '../skeleton';

export const UserDropdown = () => {
  const { user } = useUser();
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
      <DropdownMenuTrigger asChild className="w-56 cursor-pointer">
        <div className="flex items-center gap-2">
          {!user ? (
            <div className="flex w-full items-center">
              <Skeleton className="size-12 rounded-full" />
              <Skeleton className="ml-2 h-6 w-2/3" />
            </div>
          ) : (
            <>
              <div className="flex size-10 items-center justify-center overflow-hidden rounded-full border border-gray-600 transition-colors">
                <User />
              </div>
              {user?.email}
            </>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[1000] w-56 opacity-75">
        <DropdownMenuLabel className="font-bold">My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <Link to="/app/profile">
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