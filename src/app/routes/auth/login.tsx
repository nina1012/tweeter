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
        <Button
          type="button"
          variant="link"
          className="mx-auto w-2/3 bg-green-500 py-6 text-white !no-underline"
        >
          <Link to="/auth/register">Sign up</Link>
        </Button>
      </div>
    </AuthLayout>
  );
};
