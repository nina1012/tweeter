import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form/form';
import { Input } from '@/components/ui/form/input';
import { registerInputSchema } from '@/lib/auth';

export type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  //   const { addNotification } = useNotifications();

  return (
    <div>
      <Form
        onSubmit={(values) => {
          console.log(values);
          onSuccess;
          //   registering.mutate(values);
        }}
        schema={registerInputSchema}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState }) => (
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
            <Input
              type="password"
              placeholder="Confirm password"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </>
        )}
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
