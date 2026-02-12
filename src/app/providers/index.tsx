import { Header } from '@/widgets/ui/Header';
import { QueryProvider } from './QueryProvider';
import { RouterProvider } from './RouterProvider';
import { ThemeProvider } from './ThemeProvider';

interface ProvidersProps {
  children?: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => (
  <QueryProvider>
    <ThemeProvider
      defaultTheme="light"
      storageKey="vite-ui-theme"
    >
      <Header />
      
      <RouterProvider>
        {children}
      </RouterProvider>
    </ThemeProvider>
  </QueryProvider>
);
