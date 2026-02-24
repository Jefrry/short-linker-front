export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const isArrayOf = <T>(value: unknown, guard: (item: unknown) => item is T): value is T[] =>
  Array.isArray(value) && value.every(guard);

export const isType = <T>(
  data: unknown,
  guard: (data: unknown) => data is T,
  errorMessage = 'Invalid data format from backend',
): T => {
  if (guard(data)) {
    return data;
  }
  console.error(errorMessage, data);
  throw new Error(errorMessage);
};
