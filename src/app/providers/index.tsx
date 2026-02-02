import { QueryProvider } from './QueryProvider';
import { RouterProvider } from './RouterProvider';

interface ProvidersProps {
  children?: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => (
  <QueryProvider>
    <RouterProvider>{children}</RouterProvider>
  </QueryProvider>
);
