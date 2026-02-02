import { Button } from '@/shared/ui';

export const HomePage = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4">
    <h1 className="text-4xl font-bold">Hello World</h1>

    <p className="text-muted-foreground">Welcome to Short Linker</p>

    <Button>Get Started</Button>
  </div>
);
