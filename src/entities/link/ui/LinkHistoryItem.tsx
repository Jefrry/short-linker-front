import { Link } from '@/shared';

interface Props {
  data: Link;
}

export const LinkHistoryItem = ({ data: { original_url, short_url } }: Props) => (
  <div className="flex flex-col gap-2 rounded-lg border bg-card p-4 text-left shadow-sm">
    <div className="flex flex-col">
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
    </div>
  </div>
);
