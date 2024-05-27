import { Link } from 'react-router-dom';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const RegisterRoute = () => {
  return (
    <AuthLayout title="Register your account">
      <form className="flex min-h-48 flex-col gap-4  *:py-6">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm" />
        <Button type="submit">Sign up</Button>
      </form>
      <hr className="my-4" />
      <div className=" text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link className="text-primary underline" to="/auth/login">
          Log in
        </Link>
      </div>
    </AuthLayout>
  );
};
