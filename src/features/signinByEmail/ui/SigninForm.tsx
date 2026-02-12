import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { useAuth } from '@/entities/user';

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
    try {
      await signin.mutateAsync([data.email, data.password]);
      onSuccess?.();
    } catch (error) {
      console.error('Signin failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="signin-email">Email</Label>

        <Input
          id="signin-email"
          type="email"
          placeholder="mail@example.com"
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
          type="password"
          placeholder='Your password'
          {...register('password')}
          aria-invalid={!!errors.password}
        />

        {errors.password && (
          <p className="text-sm font-medium text-destructive">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full cursor-pointer" disabled={signin.isPending}>
        {signin.isPending ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
};
