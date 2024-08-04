import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form/form';
import { Input } from '@/components/ui/form/input';
import { useNotifications } from '@/components/ui/notifications';
import { registerInputSchema } from '@/lib/auth';

import { useRegister } from '../api/register';

export type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { addNotification } = useNotifications();
  const { registering } = useRegister({
    onSuccess: () => {
      addNotification({
        title: 'Successfully registered',
        type: 'success',
        message: 'Welcome to Tweeter! 😊',
      });
      onSuccess();
      console.log('onSuccess for registering is called');
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
          registering(values);
        }}
        schema={registerInputSchema}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState }) => {
          return (
            <>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="text"
                  placeholder="First Name"
                  error={formState.errors['firstName']}
                  registration={register('firstName')}
                  data-testid="first name"
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  error={formState.errors['lastName']}
                  registration={register('lastName')}
                  data-testid="last name"
                />
                <Input
                  type="text"
                  placeholder="Username"
                  error={formState.errors['username']}
                  registration={register('username')}
                  autoComplete="username"
                  data-testid="username"
                />
              </div>
              <Input
                type="email"
                placeholder="Email Address"
                error={formState.errors['email']}
                registration={register('email')}
                autoComplete="email"
                data-testid="email"
              />
              <Input
                type="password"
                placeholder="Password"
                error={formState.errors['password']}
                registration={register('password')}
                autoComplete="password"
                data-testid="password"
              />
              <Input
                type="password"
                placeholder="Confirm password"
                error={formState.errors['confirm']}
                registration={register('confirm')}
                data-testid="confirm"
              />
              <div>
                <Button type="submit" className="w-full">
                  Sign up
                </Button>
              </div>
            </>
          );
        }}
      </Form>
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
