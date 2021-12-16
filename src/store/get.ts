import { Normalized } from '@/types';

import { hasOne } from './has';

export interface GetOne {
  <T>(store: Normalized<T>, key: string): T | null;
  <T extends Normalized<any>>(store: T, key: string): T extends Normalized<infer R> ? R | null : never;
}

export interface GetMany {
  <T>(store: Normalized<T>, keys: string[]): T[];
  <T extends Normalized<any>>(store: T, keys: string[]): T extends Normalized<infer R> ? R[] : never;
}

export type Get = GetOne & GetMany;

export const getMany: GetMany = ({ allKeys, byKey }: Normalized<any>, keys: string[]) =>
  keys.filter((key) => allKeys.includes(key)).map((key) => byKey[key]);

export const getOne: GetOne = (store: Normalized<any>, key: string) => (hasOne(store, key) ? store.byKey[key] : null);

export const get: Get = (store: Normalized<any>, keys: string | string[]) => (Array.isArray(keys) ? getMany(store, keys) : getOne(store, keys));
