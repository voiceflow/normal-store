import { GetKey, Normalized, NormalizedValue } from '@/types';
import { appendUnique, prependUnique } from '@/utils';

import { AddMany, appendMany, prependMany } from './addMany';
import { updateOne } from './update';

export interface AddOne {
  <T extends Normalized<any>>(store: T, key: string, value: NormalizedValue<T>): T;
}

export interface Add extends AddOne, AddMany {}

export const prependOne: AddOne = <T extends Normalized<any>>(normalized: T, key: string, value: NormalizedValue<T>): T => ({
  ...updateOne(normalized, key, value),
  allKeys: prependUnique(normalized.allKeys, key),
});

export const appendOne: AddOne = <T extends Normalized<any>>(normalized: T, key: string, value: NormalizedValue<T>): T => ({
  ...updateOne(normalized, key, value),
  allKeys: appendUnique(normalized.allKeys, key),
});

export const prepend: Add = <T extends Normalized<any>>(
  store: T,
  keyOrValues: string | NormalizedValue<T>[],
  valueOrGetKey?: NormalizedValue<T> | GetKey<NormalizedValue<T>>
): T =>
  Array.isArray(keyOrValues)
    ? prependMany(store, keyOrValues, valueOrGetKey as GetKey<NormalizedValue<T>>)
    : prependOne(store, keyOrValues, valueOrGetKey as NormalizedValue<T>);

export const append: Add = <T extends Normalized<any>>(
  store: T,
  keyOrValues: string | NormalizedValue<T>[],
  valueOrGetKey?: NormalizedValue<T> | GetKey<NormalizedValue<T>>
): T =>
  Array.isArray(keyOrValues)
    ? appendMany(store, keyOrValues, valueOrGetKey as GetKey<NormalizedValue<T>>)
    : appendOne(store, keyOrValues, valueOrGetKey as NormalizedValue<T>);
