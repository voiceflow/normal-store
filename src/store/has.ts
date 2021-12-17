import { Normalized } from '@/types';
import { hasProperty } from '@/utils';

export interface HasOne {
  <T extends Normalized<any>>(store: T, key: string): boolean;
}

export interface HasMany {
  <T extends Normalized<any>>(store: T, keys: string[]): boolean;
}

export type Has = HasOne & HasMany;

export const hasMany: HasMany = ({ allKeys }: Normalized<any>, keys: string[]) => keys.every((key) => allKeys.includes(key));

export const hasOne: HasOne = ({ byKey }: Normalized<any>, key: string) => hasProperty(byKey, key);

export const has: Has = (store: Normalized<any>, keys: string | string[]) => (Array.isArray(keys) ? hasMany(store, keys) : hasOne(store, keys));
