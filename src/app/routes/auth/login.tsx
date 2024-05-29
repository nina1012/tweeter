import { useNavigate, useSearchParams } from 'react-router-dom';

import { AuthLayout } from '@/components/layouts/auth-layout';
// eslint-disable-next-line no-restricted-imports
import { LoginForm } from '@/features/auth/components/login-form';

export const LoginRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectTo = searchParams.get('redirectTo');
  return (
    <AuthLayout title="Welcome back">
      <LoginForm
        onSuccess={() =>
          navigate(`${redirectTo ? `${redirectTo}` : '/app'}`, {
            replace: true,
          })
        }
      />
    </AuthLayout>
  );
};
