import { useState } from 'react';

import { useCreateLink } from '@/features/createLink';

import { LinkHistoryItem } from '@/entities/link/ui';
import { useNotificationStore } from '@/entities/notification';

import { Link } from '@/shared';

import { Button } from '@/shared/ui/shadcn/button';
import { Input } from '@/shared/ui/shadcn/input';

interface LinkManagerProps {
  showHistory?: boolean;
  onLinkCreated?: (link: Link) => void;
}

export const LinkManager = ({ showHistory = true, onLinkCreated }: LinkManagerProps) => {
  const [url, setUrl] = useState('');
  const [history, setHistory] = useState<Link[]>([]);
  const { mutate, isPending } = useCreateLink();
  const addNotification = useNotificationStore((state) => state.addNotification);

  const handleCreate = () => {
    if (!url) {
      addNotification({
        type: 'warning',
        title: 'Empty URL',
        description: 'Please enter a URL to shorten',
      });
      return;
    }

    mutate(url, {
      onSuccess: (link) => {
        if (showHistory) {
          setHistory((prev) => [link, ...prev]);
        }

        setUrl('');
        addNotification({
          type: 'success',
          title: 'Link shortened!',
          description: 'Your short link is ready to use',
        });
        onLinkCreated?.(link);
      },
      onError: (error) => {
        addNotification({
          type: 'error',
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to shorten link',
        });
      },
    });
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreate();
        }}
      >
        <Input
          disabled={isPending}
          placeholder="Enter your long URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value.trim())}
        />

        <Button className="cursor-pointer" disabled={isPending} type="submit">
          {isPending ? 'Shortening...' : 'Shorten'}
        </Button>
      </form>

      {showHistory && history.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-left">Your Recent Links:</h2>

          <div className="flex flex-col gap-3">
            {history.map((item) => (
              <LinkHistoryItem data={item} key={item.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
