import { Normalized } from '@/types';
import { buildLookup, getByKey, withoutValue, withoutValues } from '@/utils';

export interface RemoveOne {
  <T extends Normalized<any>>(store: T, key: string): T;
}

export interface RemoveMany {
  <T extends Normalized<any>>(store: T, keys: string[]): T;
}

export interface Remove extends RemoveOne, RemoveMany {}

export const removeOne: RemoveOne = <T extends Normalized<any>>(store: T, key: string): T => {
  const filteredKeys = withoutValue(store.allKeys, key);

  return {
    ...store,
    allKeys: filteredKeys,
    byKey: buildLookup(filteredKeys, getByKey(store.byKey)),
  };
};

export const removeMany: RemoveMany = <T extends Normalized<any>>(store: T, keys: string[]): T => {
  const filteredKeys = withoutValues(store.allKeys, keys);

  return {
    ...store,
    allKeys: filteredKeys,
    byKey: buildLookup(filteredKeys, getByKey(store.byKey)),
  };
};

export const remove: Remove = <T extends Normalized<any>>(store: T, keys: string | string[]): T =>
  Array.isArray(keys) ? removeMany(store, keys) : removeOne(store, keys);
