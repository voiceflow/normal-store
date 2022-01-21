import { Normalized } from '@/types';
import { hasProperty } from '@/utils';

export interface HasOne {
  <T extends Normalized<any>>(store: T, key: string): boolean;
}

export interface HasOneCurry {
  <T extends Normalized<any>>(store: T): (key: string) => boolean;
}

export interface HasMany {
  <T extends Normalized<any>>(store: T, keys: string[]): boolean;
}

export interface HasManyCurry {
  <T extends Normalized<any>>(store: T): (keys: string[]) => boolean;
}

export interface Has extends HasOne, HasMany {}

export interface HasCurry {
  <T extends Normalized<any>>(store: T): (keys: string | string[]) => boolean;
}

export const hasMany: HasMany = (store: Normalized<any>, keys: string[]) => keys.every((key) => hasOne(store, key));

export const hasManyCurry: HasManyCurry = (store: Normalized<any>) => (keys: string[]) => hasMany(store, keys);

export const hasOne: HasOne = ({ byKey }: Normalized<any>, key: string) => hasProperty(byKey, key);

export const hasOneCurry: HasOneCurry = (store: Normalized<any>) => (key: string) => hasOne(store, key);

export const has: Has = (store: Normalized<any>, keys: string | string[]) => (Array.isArray(keys) ? hasMany(store, keys) : hasOne(store, keys));

export const hasCarry: HasCurry = (store: Normalized<any>) => (keys: string | string[]) =>
  Array.isArray(keys) ? hasMany(store, keys) : hasOne(store, keys);
