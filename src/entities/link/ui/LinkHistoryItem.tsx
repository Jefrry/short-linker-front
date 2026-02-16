import { Link } from "@/shared";

interface Props {
  data: Link;
}

export const LinkHistoryItem = ({ data: { original_url, short_url } }: Props) => {
  return (
    <div className="flex flex-col gap-2 rounded-lg border bg-card p-4 text-left shadow-sm">
      <div className="flex flex-col">
        <a
          href={original_url}
          target="_blank"
          rel="noreferrer"
          className="text-[10px] font-bold text-muted-foreground hover:underline truncate"
        >
          {original_url}
        </a>

        <a
          href={short_url}
          target="_blank"
          rel="noreferrer"
          className="truncate text-sm mt-1 font-medium text-primary hover:underline"
        >
          {short_url}
        </a>
      </div>
    </div>
  );
};
