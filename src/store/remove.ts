import { Normalized } from '@/types';
import { buildLookup, getByKey, withoutValue, withoutValues } from '@/utils';

export interface RemoveOne {
  <T>(store: Normalized<T>, key: string): Normalized<T>;
  <T extends Normalized<any>>(store: T, key: string): T;
}

export interface RemoveMany {
  <T>(store: Normalized<T>, keys: string[]): Normalized<T>;
  <T extends Normalized<any>>(store: T, keys: string[]): T;
}

export type Remove = RemoveOne | RemoveMany;

export const removeOne: RemoveOne = (store: Normalized<any>, key: string) => {
  const filteredKeys = withoutValue(store.allKeys, key);

  return {
    ...store,
    allKeys: filteredKeys,
    byKey: buildLookup(filteredKeys, getByKey(store.byKey)),
  };
};

export const removeMany: RemoveMany = (store: Normalized<any>, keys: string[]) => {
  const filteredKeys = withoutValues(store.allKeys, keys);

  return {
    ...store,
    allKeys: filteredKeys,
    byKey: buildLookup(filteredKeys, getByKey(store.byKey)),
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const remove = <T extends Normalized<any>>(store: T, keys: string | string[]) =>
  Array.isArray(keys) ? removeMany(store, keys) : removeOne(store, keys);
