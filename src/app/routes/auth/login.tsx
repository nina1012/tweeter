import { AuthLayout } from '@/components/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const LoginRoute = () => {
  return (
    <AuthLayout title="Welcome back">
      <form className="flex flex-col gap-4">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />

        <Button type="submit">Log in</Button>
      </form>
    </AuthLayout>
  );
};
