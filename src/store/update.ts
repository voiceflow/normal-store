import { GetKey, Identifiable, Normalized, NormalizedValue } from '@/types';
import { buildLookup, defaultGetKey, getByIndex } from '@/utils';

export interface UpdateOne {
  <T extends Normalized<any>>(store: T, key: string, update: NormalizedValue<T>): T;
}

export interface UpdateMany {
  <T extends Normalized<Identifiable>>(store: T, values: NormalizedValue<T>[]): T;
  <T extends Normalized<any>>(store: T, values: NormalizedValue<T>[], getKey: GetKey<NormalizedValue<T>>): T;
}

export interface Update extends UpdateOne, UpdateMany {}

export const updateOne: UpdateOne = <T extends Normalized<any>>(store: T, key: string, value: NormalizedValue<T>): T => ({
  ...store,
  byKey: { ...store.byKey, [key]: value },
});

export const updateMany: UpdateMany = <T extends Normalized<any>>(
  store: T,
  values: NormalizedValue<T>[],
  getKey: GetKey<NormalizedValue<T>> = defaultGetKey as GetKey<NormalizedValue<T>>
): T => ({
  ...store,
  byKey: { ...store.byKey, ...buildLookup(values.map(getKey), getByIndex(values)) },
});

export const update: Update = <T extends Normalized<any>>(
  store: T,
  keyOrValues: string | NormalizedValue<T>[],
  valueOrGetKey?: NormalizedValue<T> | GetKey<NormalizedValue<T>>
): T =>
  Array.isArray(keyOrValues)
    ? updateMany(store, keyOrValues, valueOrGetKey as GetKey<NormalizedValue<T>>)
    : updateOne(store, keyOrValues, valueOrGetKey as NormalizedValue<T>);
