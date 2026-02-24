import { useState } from 'react';
import { Link } from 'react-router';

import { useDeleteLink } from '@/features/deleteLink';

import { useUserLinks } from '@/entities/user';

import { getRouteLinkDashboard } from '@/shared/config/routes';

import { Button } from '@/shared/ui/shadcn/button';
import { Checkbox } from '@/shared/ui/shadcn/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/shadcn/table';

export const UserLinksTable = () => {
  const { data: links, isLoading, isError } = useUserLinks();
  const { deleteLinks, isDeleting } = useDeleteLink({
    onSuccess: (ids: string[]) => {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        ids.forEach((id) => next.delete(id));
        return next;
      });
    },
  });

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  if (isLoading) {
    return <div className="py-4 text-center">Loading links...</div>;
  }

  if (isError) {
    return <div className="py-4 text-center text-red-500">Failed to load links</div>;
  }

  const activeLinks = links?.filter((link) => !link.deleted) || [];
  const allActiveSelected =
    activeLinks.length > 0 && activeLinks.every((link) => selectedIds.has(link.id));

  const toggleSelectAll = () => {
    if (allActiveSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(activeLinks.map((link) => link.id)));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleDelete = () => {
    deleteLinks(Array.from(selectedIds));
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-end">
        <Button
          className="cursor-pointer"
          disabled={isDeleting || selectedIds.size === 0}
          variant="destructive"
          onClick={handleDelete}
        >
          {isDeleting ? 'Deleting...' : `Delete Selected (${selectedIds.size})`}
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={allActiveSelected}
                  className="cursor-pointer"
                  disabled={activeLinks.length === 0}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>

              <TableHead className="w-[100px]">Id</TableHead>

              <TableHead>Link</TableHead>

              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {links && links.length > 0 ? (
              links.map(({ id, original_url, short_url, deleted }) => (
                <TableRow className={deleted ? 'opacity-50' : ''} key={id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.has(id)}
                      className="cursor-pointer"
                      disabled={deleted}
                      onCheckedChange={() => toggleSelect(id)}
                    />
                  </TableCell>

                  <TableCell className="font-medium">
                    <Link className="hover:underline" to={getRouteLinkDashboard(id)}>
                      {id}
                    </Link>
                  </TableCell>

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
                <TableCell className="h-24 text-center" colSpan={4}>
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
