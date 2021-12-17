import { Normalized } from '@/types';

export interface Reorder {
  <T extends Normalized<any>>(store: T, keys: string[]): T;
}

export const reorder: Reorder = <T extends Normalized<any>>(store: T, keys: string[]): T => ({
  ...store,
  allKeys: keys,
});
