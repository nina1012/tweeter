/* eslint-disable jsx-a11y/label-has-associated-control */
import { ImagePlus } from 'lucide-react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { Input } from '@/components/ui/form';
import { User } from '@/features/user/types';

export type UserModalBackgroundImageProps = {
  error?: FieldError | null | undefined;
  userData: User | undefined | null;
  registration: UseFormRegisterReturn<'backgroundImage'>;
};

export const UserModalBackgroundImage = ({
  error,
  userData,
  registration,
}: UserModalBackgroundImageProps) => {
  return (
    <div
      className="
         relative mb-8 border-b border-b-[neutral-700] pb-6

        "
    >
      {/* if no background image provided */}
      {!userData?.background_image && (
        <div
          className="flex h-40 w-full justify-center 
rounded-md bg-neutral-400 pt-14 text-sm font-semibold capitalize
        "
        ></div>
      )}
      {/* if there is a background image */}
      {userData?.background_image && (
        <img
          className="relative max-h-28 w-full rounded-md object-cover object-center md:max-h-48"
          src={userData.background_image}
          alt="background"
        />
      )}
      {/* file input */}
      {/* file input to change the background image */}
      <label
        htmlFor="user-background-image-input"
        className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-stone-500/50 text-primary focus-within:bg-primary focus-within:text-white hover:bg-primary hover:text-white"
      >
        <ImagePlus />
        <Input
          type="file"
          registration={registration}
          error={error}
          className="hidden"
          id="user-background-image-input"
        />
      </label>
    </div>
  );
};
