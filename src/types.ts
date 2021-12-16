export interface Identifiable {
  id: number | string;
}

export type NormalizedValue<T> = T extends Normalized<infer R> ? R : never;

export interface Normalized<T> {
  byKey: Record<string, T>;
  allKeys: string[];
}

export type GetKey<T> = (obj: T, index: number, array: T[]) => string;
