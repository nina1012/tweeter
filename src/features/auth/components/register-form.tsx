import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input/input';

export type RegisterFormProps = {
  onSuccess: () => unknown;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { handleSubmit, register } = useForm();

  //   const { addNotification } = useNotifications();

  return (
    <div>
      <form
        className="flex min-h-48 flex-col gap-4  *:py-6"
        onSubmit={handleSubmit(onSuccess)}
      >
        <Input
          type="email"
          id="email"
          autoComplete="true"
          //   error={formState.errors['email']}
          {...register('email', {
            required: true,
          })}
        />
        <Input
          type="password"
          id="password"
          placeholder="Password"
          {...register('password', {
            required: true,
          })}
          //   error={formState.errors['password']}
        />
        <Input
          type="password"
          placeholder="confirm"
          //   error={formState.errors['password']}
          {...register('password', {
            required: true,
          })}
        />
        <Button type="submit">Sign up</Button>
      </form>
      <hr className="my-4" />
      <div className=" text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link className="text-primary underline" to="/auth/login">
          Log in
        </Link>
      </div>
    </div>
  );
};
