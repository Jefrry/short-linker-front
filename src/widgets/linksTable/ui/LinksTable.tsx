import { useUserLinks } from '@/entities/user';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';

export const LinksTable = () => {
  const { data: links, isLoading, isError } = useUserLinks();

  if (isLoading) {
    return <div className="py-4 text-center">Loading links...</div>;
  }

  if (isError) {
    return <div className="py-4 text-center text-red-500">Failed to load links</div>;
  }

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>

              <TableHead>Link</TableHead>

              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {links && links.length > 0 ? (
              links.map(({ id, original_url, short_url, deleted }) => (
                <TableRow key={id}>
                  <TableCell className="font-medium">{id}</TableCell>

                  <TableCell className="max-w-md truncate flex flex-col">
                    <a
                      className="text-[10px] font-bold text-muted-foreground hover:underline truncate"
                      href={original_url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {original_url}
                    </a>

                    <a
                      className="truncate text-sm mt-1 font-medium text-primary hover:underline"
                      href={short_url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {short_url}
                    </a>
                  </TableCell>

                  <TableCell className="text-right">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        deleted ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {deleted ? 'Deleted' : 'Active'}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="h-24 text-center" colSpan={3}>
                  No links found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
