import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form/form';
import { Input } from '@/components/ui/form/input';
import { useNotifications } from '@/components/ui/notifications';
import { loginInputSchema } from '@/lib/auth';

import { useLogin } from '../api/login';

export type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { addNotification } = useNotifications();
  const { login } = useLogin({
    onSuccess: () => {
      addNotification({
        title: 'Successfully logged in',
        type: 'success',
        message: 'Welcome back to Tweeter 😊',
      });
      onSuccess();
    },
    onError: (error) => {
      addNotification({
        title: 'Error',
        type: 'error',
        message: error,
      });
    },
  });
  return (
    <div>
      <Form
        onSubmit={(values) => {
          login(values);
        }}
        schema={loginInputSchema}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState }) => {
          return (
            <>
              <Input
                type="email"
                placeholder="Email Address"
                error={formState.errors['email']}
                registration={register('email')}
              />
              <Input
                type="password"
                placeholder="Password"
                error={formState.errors['password']}
                registration={register('password')}
              />

              <div>
                <Button type="submit" className="w-full">
                  Log in
                </Button>
              </div>
            </>
          );
        }}
      </Form>
      <hr className="my-4" />
      <div className=" text-center text-sm text-gray-600">
        Don&apos;t have an account yet?{' '}
        <Link className="text-primary underline" to="/auth/register">
          Sign up
        </Link>
      </div>
    </div>
  );
};
