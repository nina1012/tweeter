import { Link } from 'react-router-dom';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const LoginRoute = () => {
  return (
    <AuthLayout title="Welcome back">
      <div className="flex flex-col">
        <form className="flex min-h-40 flex-col gap-4 *:py-6 ">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button type="submit">Log in</Button>
          <Button type="button" variant="link">
            Forgotten password?
          </Button>
        </form>
        <hr className="my-4" />
        <div className=" text-center text-sm text-gray-600">
          Don&apos;t have an account yet?{' '}
          <Link className="text-primary underline" to="/auth/register">
            Sign up
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};
