/* eslint-disable jsx-a11y/label-has-associated-control */
import { ImagePlus } from 'lucide-react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { Input } from '@/components/ui/form';

export type UserModalAvatarImage = {
  error?: FieldError | null | undefined;
  avatarImage: string;
  registration: UseFormRegisterReturn<'avatarImage'>;
};

export const UserModalAvatarImage = ({
  error,
  avatarImage,
  registration,
}: UserModalAvatarImage) => {
  return (
    <div className="relative">
      {/*  when user doesn't have an avatar image */}
      {!avatarImage && <div className="size-40 rounded-md bg-gray-200"></div>}
      {/* user has an avatar image */}
      {avatarImage && (
        <img
          className="size-40 rounded-md object-cover object-center"
          src={avatarImage}
          alt="avatar"
        />
      )}
      {/* file input for updating avatar image */}
      <label
        htmlFor="user-avatar-image-input"
        className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[50%] bg-stone-500/50 text-primary focus-within:bg-primary focus-within:text-white hover:bg-primary hover:text-white"
      >
        <ImagePlus />
        <Input
          type="file"
          registration={registration}
          className="hidden"
          error={error}
          id="user-avatar-image-input"
        />
      </label>
    </div>
  );
};
