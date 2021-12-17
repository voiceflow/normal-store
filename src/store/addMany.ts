import { GetKey, Identifiable, Normalized, NormalizedValue } from '@/types';
import { defaultGetKey, withoutValues } from '@/utils';

export interface AddMany {
  <T extends Normalized<Identifiable>>(store: T, values: T[]): T;
  <T extends Normalized<any>>(store: T, values: T[], getKey: GetKey<T>): T;
}

const addMany = <T extends Identifiable | unknown, N extends Normalized<T>, K extends GetKey<T> = GetKey<T>>(
  store: N,
  values: T[],
  mergeKeys: (allKeys: string[], newKeys: string[]) => string[],
  getKey?: K
): N => {
  const keyGetter = getKey ?? (defaultGetKey as unknown as K);
  const newKeys = withoutValues(values.map(keyGetter), store.allKeys);

  return {
    ...store,
    byKey: {
      ...store.byKey,
      ...Object.fromEntries(values.map((value, index, allValues) => [keyGetter(value, index, allValues), value])),
    },
    allKeys: mergeKeys(store.allKeys, newKeys),
  };
};

export const prependMany: AddMany = <T extends Normalized<any>>(store: T, values: NormalizedValue<T>[], getKey?: GetKey<NormalizedValue<T>>) =>
  addMany(store, values, (allKeys, newKeys) => [...newKeys, ...allKeys], getKey);

export const appendMany: AddMany = <T extends Normalized<any>>(store: T, values: NormalizedValue<T>[], getKey?: GetKey<NormalizedValue<T>>) =>
  addMany(store, values, (allKeys, newKeys) => [...allKeys, ...newKeys], getKey);
