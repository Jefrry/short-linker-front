export interface Link {
    id: string;
    originalUrl: string;
    userId: number;
    deleted: boolean;
}

export interface LinkHistory extends Link {
  shortUrl: string;
}

