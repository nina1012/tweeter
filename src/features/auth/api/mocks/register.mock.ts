import { AuthResponse } from '@supabase/supabase-js';

export const mockRegisterFn = async ({
  email,
  password,
  firstName,
  lastName,
  username,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
}): Promise<AuthResponse['data']> => {
  if (email && password && firstName && lastName && username) {
    return {
      user: {
        id: '123',
        email,
      } as any,
      session: {
        access_token: 'mock_access_token',
        refresh_token: 'mock_refresh_token',
      } as any,
    };
  }
  throw new Error('Fill all the fields');
};

export const mockUseRegister = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: AuthResponse['data']) => void;
  onError?: (error: string) => void;
}) => {
  const register = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
  }) => {
    try {
      const result = await mockRegisterFn(data);
      console.log(result);
      onSuccess?.(result);
    } catch (error: unknown) {
      onError?.(error as string);
    }
  };
  return { register, isPending: false };
};
