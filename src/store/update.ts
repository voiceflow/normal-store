import { Normalized, NormalizedValue } from '@/types';

export interface UpdateOne {
  <T extends Normalized<any>>(store: T, key: string, update: NormalizedValue<T>): T;
}

export const updateOne: UpdateOne = <T extends Normalized<any>>(store: T, key: string, value: NormalizedValue<T>): T => ({
  ...store,
  byKey: { ...store.byKey, [key]: value },
});
