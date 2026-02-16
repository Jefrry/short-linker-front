export type ResponseApi<T> = {
  data: T;
};

export interface Link {
  id: string;
  original_url: string;
  short_url: string;
  user_id: number;
  deleted: boolean;
}
