import { GetKey, Identifiable, Normalized } from '@/types';
import { buildLookup, defaultGetKey, getByIndex } from '@/utils';

export * from './add';
export * from './addMany';
export * from './get';
export * from './has';
export * from './patch';
export * from './remove';
export * from './update';

export interface Normalize {
  <T extends Identifiable>(items: T[]): Normalized<T>;
  <T>(items: T[], getKey: GetKey<T>): Normalized<T>;
}

export const normalize: Normalize = <T extends Identifiable | unknown>(items: T[], getKey?: GetKey<T>) => {
  const allKeys = items.map(getKey ?? (defaultGetKey as GetKey<T>));

  return {
    byKey: buildLookup<T>(allKeys, getByIndex<T>(items)),
    allKeys,
  };
};

export const denormalize = <T>({ allKeys, byKey }: Normalized<T>): T[] => allKeys.map((key) => byKey[key]);

export const createEmpty = <T>(): Normalized<T> => ({ byKey: {}, allKeys: [] });
