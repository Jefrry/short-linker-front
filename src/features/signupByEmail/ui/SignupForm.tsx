import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { useAuth } from '@/entities/user';

const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'Password must be at most 72 characters')
    .regex(/[a-zA-Z]/, 'Password must contain at least one letter')
    .regex(/[0-9]/, 'Password must contain at least one digit'),
});

type SignupFormValues = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSuccess?: () => void;
}

export const SignupForm = ({ onSuccess }: SignupFormProps) => {
  const { signup } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      await signup.mutateAsync([data.email, data.password, data.name]);
      onSuccess?.();
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="signup-name">Name</Label>

        <Input
          id="signup-name"
          placeholder="John Doe"
          {...register('name')}
          aria-invalid={!!errors.name}
        />

        {errors.name && (
          <p className="text-sm font-medium text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>

        <Input
          id="signup-email"
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
        <Label htmlFor="signup-password">Password</Label>

        <Input
          id="signup-password"
          type="password"
          placeholder='Your password'
          {...register('password')}
          aria-invalid={!!errors.password}
        />

        {errors.password && (
          <p className="text-sm font-medium text-destructive">{errors.password.message}</p>
        )}
      </div>
      
      <Button type="submit" className="w-full" disabled={signup.isPending}>
        {signup.isPending ? 'Creating account...' : 'Sign Up'}
      </Button>
    </form>
  );
};
