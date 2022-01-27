import { Normalized, NormalizedValue } from '@/types';
import { getByKey } from '@/utils';

import { hasOne, hasOneCurry } from './has';

export interface GetOne {
  <T extends Normalized<any>>(store: T, key: string): NormalizedValue<T> | null;
}

export interface GetMany {
  <T extends Normalized<any>>(store: T, keys: string[]): NormalizedValue<T>[];
}

export interface Get extends GetMany, GetOne {}

export const getMany: GetMany = <T extends Normalized<any>>(store: T, keys: string[]): NormalizedValue<T>[] =>
  keys.filter(hasOneCurry(store)).map(getByKey(store.byKey));

export const getOne: GetOne = <T extends Normalized<any>>(store: T, key: string): NormalizedValue<T> | null =>
  hasOne(store, key) ? store.byKey[key] : null;

export const get: Get = <T extends Normalized<any>>(store: T, keys: string | string[]): any =>
  Array.isArray(keys) ? getMany<T>(store, keys) : getOne<T>(store, keys);
