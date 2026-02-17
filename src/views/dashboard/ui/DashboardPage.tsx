import { useQueryClient } from '@tanstack/react-query';

import { LinkManager } from '@/widgets/linkManager';
import { LinksTable } from '@/widgets/linksTable';

import { Link } from '@/shared';

export const DashboardPage = () => {
  const queryClient = useQueryClient();

  const handleLinkCreated = (link: Link) => {
    queryClient.setQueryData(['user-links'], (old: Link[]) => [link, ...old]);
  };

  return (
    <div className="container mx-auto flex flex-col gap-6 py-12">
      <h2 className="text-2xl font-bold">Add new link</h2>

      <LinkManager showHistory={false} onLinkCreated={handleLinkCreated} />

      <h2 className="text-2xl font-bold">My links</h2>

      <LinksTable />
    </div>
  );
};
