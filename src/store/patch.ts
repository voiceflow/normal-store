import { Normalized, NormalizedValue } from '@/types';
import { buildLookup, getByIndex } from '@/utils';

import { getOne } from './get';
import { hasOne } from './has';
import { updateOne } from './update';

type PatchValue<T extends Normalized<any>> = Partial<NormalizedValue<T>> | ((value: NormalizedValue<T>) => Partial<NormalizedValue<T>>);

export interface PatchOne {
  <T extends Normalized<any>>(store: T, key: string, patch: PatchValue<T>): T;
}

export interface PatchManyItem<T extends Normalized<any>> {
  key: string;
  value: PatchValue<T>;
}

export interface PatchMany {
  <T extends Normalized<any>>(store: T, patches: PatchManyItem<T>[]): T;
}

export interface Patch extends PatchOne, PatchMany {}

export const patchOne: PatchOne = <T extends Normalized<any>>(store: T, key: string, patch: PatchValue<T>): T => {
  if (!hasOne(store, key)) return store;

  const value = getOne(store, key)!;

  return updateOne(store, key, { ...value, ...(typeof patch === 'function' ? patch(value) : patch) });
};

export const patchMany: PatchMany = <T extends Normalized<any>>(store: T, patches: PatchManyItem<T>[]): T => {
  const patchesToPerform = patches.filter(({ key }) => hasOne(store, key));

  if (patchesToPerform.length === 0) return store;

  const values = patchesToPerform.map(({ key, value }) => ({
    ...getOne(store, key)!,
    ...(typeof value === 'function' ? value(getOne(store, key)!) : value),
  }));

  return {
    ...store,
    byKey: {
      ...store.byKey,
      ...buildLookup(
        patchesToPerform.map(({ key }) => key),
        getByIndex(values)
      ),
    },
  };
};

export const patch: Patch = <T extends Normalized<any>>(store: T, keyOrPatches: string | PatchManyItem<T>[], value?: PatchValue<T>): T =>
  Array.isArray(keyOrPatches) ? patchMany(store, keyOrPatches) : patchOne(store, keyOrPatches, value as PatchValue<T>);
