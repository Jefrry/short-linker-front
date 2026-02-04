import { LinkHistory } from "..";


interface Props {
  data: Partial<LinkHistory>;
}

export const LinkHistoryItem = ({ data: { originalUrl, shortUrl } }: Props) => {
  return (
    <div className="flex flex-col gap-2 rounded-lg border bg-card p-4 text-left shadow-sm">
      <div className="flex flex-col">
        <a
          href={originalUrl}
          target="_blank"
          rel="noreferrer"
          className="text-[10px] font-bold text-muted-foreground hover:underline truncate"
        >
          {originalUrl}
        </a>

        <a
          href={shortUrl}
          target="_blank"
          rel="noreferrer"
          className="truncate text-sm mt-1 font-medium text-primary hover:underline"
        >
          {shortUrl}
        </a>
      </div>
    </div>
  );
};
