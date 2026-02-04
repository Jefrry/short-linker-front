import { useState } from 'react';
import { useCreateLink } from '@/features/createLink';
import { LinkHistoryItem } from '@/entities/link/ui';
import { LinkHistory } from '@/entities/link';
import { Button, Input } from '@/shared/ui';

export const LinkManager = () => {
  const [url, setUrl] = useState('');
  const [history, setHistory] = useState<Partial<LinkHistory>[]>([]);
  const { mutate, isPending, error } = useCreateLink();

  const handleCreate = () => {
    mutate(url, {
      onSuccess: (shortLink) => {
        setHistory((prev) => [{ originalUrl: url, short: shortLink }, ...prev]);
        setUrl('');
      },
    });
  };

  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreate();
        }}
        className="flex gap-2"
      >
        <Input
          placeholder="Enter your long URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value.trim())}
          disabled={isPending}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? 'Shortening...' : 'Shorten'}
        </Button>
      </form>

      {error && (
        <p className="text-sm text-destructive">
          {error instanceof Error ? error.message : 'Something went wrong'}
        </p>
      )}

      {history.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-left">Your Recent Links:</h2>

          <div className="flex flex-col gap-3">
            {history.map((item, index) => (
              <LinkHistoryItem
                key={`${item.shortUrl}-${index}`}
                data={item}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
