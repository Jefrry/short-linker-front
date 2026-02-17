import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useAuth } from '@/entities/user';

import { Button } from '@/shared/ui/shadcn/button';
import { Input } from '@/shared/ui/shadcn/input';
import { Label } from '@/shared/ui/shadcn/label';

const signinSchema = z.object({
  email: z.email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'Password must be at most 72 characters')
    .regex(/[a-zA-Z]/, 'Password must contain at least one letter')
    .regex(/[0-9]/, 'Password must contain at least one digit'),
});

type SigninFormValues = z.infer<typeof signinSchema>;

interface SigninFormProps {
  onSuccess?: () => void;
}

export const SigninForm = ({ onSuccess }: SigninFormProps) => {
  const { signin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SigninFormValues) => {
    await signin.mutateAsync([data.email, data.password]);
    onSuccess?.();
  };

  return (
    <form className="space-y-4 py-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="signin-email">Email</Label>

        <Input
          id="signin-email"
          placeholder="mail@example.com"
          type="email"
          {...register('email')}
          aria-invalid={!!errors.email}
        />

        {errors.email && (
          <p className="text-sm font-medium text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="signin-password">Password</Label>

        <Input
          id="signin-password"
          placeholder="Your password"
          type="password"
          {...register('password')}
          aria-invalid={!!errors.password}
        />

        {errors.password && (
          <p className="text-sm font-medium text-destructive">{errors.password.message}</p>
        )}
      </div>

      <Button className="w-full cursor-pointer" disabled={signin.isPending} type="submit">
        {signin.isPending ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
};
