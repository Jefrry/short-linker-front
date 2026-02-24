import { isRecord } from '@/shared/lib/typeGuards';

import { User } from '../model/types';

export const isUser = (data: unknown): data is User =>
  isRecord(data) &&
  typeof data.id === 'number' &&
  typeof data.name === 'string' &&
  typeof data.email === 'string' &&
  typeof data.created_at === 'string';
