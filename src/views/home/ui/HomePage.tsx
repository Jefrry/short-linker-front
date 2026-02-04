import { LinkManager } from '@/widgets/linkManager';

export const HomePage = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
    <div className="flex flex-col items-center gap-2 text-center">
      <h1 className="text-4xl font-bold">Short Linker</h1>
      <p className="text-muted-foreground">Enter a long URL to get a shortened version instantly</p>
    </div>

    <LinkManager />
  </div>
);
