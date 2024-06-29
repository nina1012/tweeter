/* eslint-disable jsx-a11y/label-has-associated-control */
import { ImagePlus } from 'lucide-react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { Input } from '@/components/ui/form';

export type UserModalAvatarImage = {
  error?: FieldError | null | undefined;
  avatar_image: string;
  registration: UseFormRegisterReturn<'avatar_image'>;
};

export const UserModalAvatarImage = ({
  error,
  avatar_image,
  registration,
}: UserModalAvatarImage) => {
  if (!avatar_image)
    return <div className="size-40 rounded-md bg-gray-200"></div>;
  return (
    <div className="relative">
      {/*  when user doesn't have an avatar image */}
      {!avatar_image && <div className="size-40 rounded-md bg-gray-200"></div>}
      {/* user has an avatar image */}
      {avatar_image && (
        <img
          className="size-40 rounded-md object-cover object-center"
          src={avatar_image}
          alt="avatar"
        />
      )}
      {/* file input for updating avatar image */}
      <label
        htmlFor="user-avatar-image-input"
        className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center justify-center rounded-[50%] bg-stone-500/50 text-primary focus-within:bg-primary focus-within:text-white hover:bg-primary hover:text-white"
      >
        <ImagePlus className="size-1/2 space-y-1" />
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
