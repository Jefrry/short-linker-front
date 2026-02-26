import { Link } from 'react-router';

import { Button } from '@/shared/ui/shadcn/button';

export const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-center px-4">
    <h1 className="text-9xl font-bold text-primary">404</h1>

    <h2 className="text-3xl font-semibold mt-4 mb-2">Page Not Found</h2>

    <p className="text-muted-foreground mb-8 max-w-md">
      Oops! The page you are looking for doesn&apos;t exist or has been moved.
    </p>

    <Button asChild size="lg">
      <Link to="/">Go back home</Link>
    </Button>
  </div>
);
