import { Normalized, NormalizedValue } from '@/types';

import { getOne } from './get';
import { hasOne } from './has';
import { updateOne } from './update';

export interface PatchOne {
  <T extends Normalized<any>>(store: T, key: string, patch: Partial<NormalizedValue<T>> | ((value: T) => Partial<NormalizedValue<T>>)): T;
}

export const patchOne: PatchOne = <T extends Normalized<any>>(
  store: T,
  key: string,
  patch: Partial<NormalizedValue<T>> | ((value: T) => Partial<NormalizedValue<T>>)
): T => {
  if (!hasOne(store, key)) return store;

  const value = getOne(store, key)!;

  return updateOne(store, key, { ...value, ...(typeof patch === 'function' ? patch(value) : patch) });
};
