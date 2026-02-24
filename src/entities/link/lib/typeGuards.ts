import { Link } from '@/shared';
import { isRecord } from '@/shared/lib/typeGuards';

import { LinkMetrics } from '../model';

export const isLink = (data: unknown): data is Link =>
  isRecord(data) &&
  typeof data.id === 'string' &&
  typeof data.original_url === 'string' &&
  typeof data.short_url === 'string' &&
  typeof data.user_id === 'number' &&
  typeof data.deleted === 'boolean';

export const isLinkMetrics = (data: unknown): data is LinkMetrics =>
  isRecord(data) && typeof data.date === 'string' && typeof data.count === 'number';
