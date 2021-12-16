import { Identifiable } from './types';

export const stringify = (value: any): string => (typeof value === 'string' ? value : String(value));

export const withoutValue = <T>(items: T[], value: T): T[] => {
  const index = items.indexOf(value);

  return index < 0 ? items : [...items.slice(0, index), ...items.slice(index + 1)];
};

export const withoutValues = <T>(items: T[], values: T[]): T[] => items.filter((item) => !values.includes(item));

export const appendUnique = <T>(items: T[], value: T): T[] => (items.includes(value) ? items : [...items, value]);

export const prependUnique = <T>(items: T[], value: T): T[] => (items.includes(value) ? items : [value, ...items]);

export const buildLookup = <T>(allKeys: string[], getValue: (key: string, index: number) => T): Record<string, T> =>
  allKeys.reduce<Record<string, T>>((acc, key, index) => {
    acc[key] = getValue(key, index);

    return acc;
  }, {});

export const hasProperty = <T, K extends keyof T>(obj: T, key: K | string): obj is T & Record<K, unknown> =>
  Object.prototype.hasOwnProperty.call(obj, key);

export const getByIndex =
  <T>(items: T[]) =>
  (_: string, index: number): T =>
    items[index];

export const getByKey =
  <T>(lookup: Record<string, T>) =>
  (key: string): T =>
    lookup[key];

export const defaultGetKey = <T extends Identifiable>(obj: T): string => stringify(obj.id);
