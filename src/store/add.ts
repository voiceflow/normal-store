import { Normalized, NormalizedValue } from '@/types';
import { appendUnique, prependUnique } from '@/utils';

import { updateOne } from './update';

export interface AddOne {
  <T>(store: Normalized<T>, key: string, value: T): T | null;
  <T extends Normalized<any>>(store: T, key: string, value: NormalizedValue<T>): T;
}

export const prependOne: AddOne = <T extends Normalized<T>>(normalized: T, key: string, value: NormalizedValue<T>): T => ({
  ...updateOne(normalized, key, value),
  allKeys: prependUnique(normalized.allKeys, key),
});

export const appendOne: AddOne = <T extends Normalized<T>>(normalized: T, key: string, value: NormalizedValue<T>): T => ({
  ...updateOne(normalized, key, value),
  allKeys: appendUnique(normalized.allKeys, key),
});
