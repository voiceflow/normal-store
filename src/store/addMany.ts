import { GetKey, Identifiable, Normalized, NormalizedValue } from '@/types';
import { defaultGetKey, withoutValues } from '@/utils';

import { updateMany } from './update';

export interface AddMany {
  <T extends Normalized<Identifiable>>(store: T, values: NormalizedValue<T>[]): T;
  <T extends Normalized<any>>(store: T, values: NormalizedValue<T>[], getKey: GetKey<NormalizedValue<T>>): T;
}

const addMany = <T extends Normalized<any>, K extends GetKey<NormalizedValue<T>> = GetKey<NormalizedValue<T>>>(
  store: T,
  values: NormalizedValue<T>[],
  mergeKeys: (allKeys: string[], newKeys: string[]) => string[],
  getKey: K = defaultGetKey as unknown as K
): T => {
  const newKeys = withoutValues(values.map(getKey), store.allKeys);

  return {
    ...store,
    ...updateMany(store, values, getKey),
    allKeys: mergeKeys(store.allKeys, newKeys),
  };
};

export const prependMany: AddMany = <T extends Normalized<any>>(store: T, values: NormalizedValue<T>[], getKey?: GetKey<NormalizedValue<T>>) =>
  addMany(store, values, (allKeys, newKeys) => [...newKeys, ...allKeys], getKey);

export const appendMany: AddMany = <T extends Normalized<any>>(store: T, values: NormalizedValue<T>[], getKey?: GetKey<NormalizedValue<T>>) =>
  addMany(store, values, (allKeys, newKeys) => [...allKeys, ...newKeys], getKey);
