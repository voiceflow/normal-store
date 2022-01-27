import { expect } from 'chai';

import { normalize, update, updateMany, updateOne } from '@/store';

describe('store | update', () => {
  describe('updateOne()', () => {
    const value = { id: 'a', foo: false };
    const store = normalize([value]);

    it('replaces an existing value by a key', () => {
      const update = { id: 'a', foo: true };

      expect(updateOne(store, 'a', update)).to.eql({ allKeys: ['a'], byKey: { a: update } });
    });

    it('adds a new value when key is not recognized', () => {
      const update = { id: 'b', foo: true };

      expect(updateOne(store, 'b', update)).to.eql({ allKeys: ['a'], byKey: { a: value, b: update } });
    });
  });

  describe('updateMany()', () => {
    const store = normalize([
      { id: 'a', foo: false },
      { id: 'b', foo: true },
    ]);

    it('replaces an existing values', () => {
      const updateA = { id: 'a', foo: true };
      const updateB = { id: 'b', foo: false };

      expect(updateMany(store, [updateA, updateB])).to.eql({ allKeys: ['a', 'b'], byKey: { a: updateA, b: updateB } });
    });

    it('adds a new values when key is not recognized', () => {
      const update = { id: 'c', foo: true };

      expect(updateMany(store, [update])).to.eql({ allKeys: ['a', 'b'], byKey: { ...store.byKey, c: update } });
    });
  });

  describe('update()', () => {
    const store = normalize([
      { id: 'a', foo: false },
      { id: 'b', foo: true },
    ]);

    it('replaces an existing values', () => {
      const updateA = { id: 'a', foo: true };
      const updateB = { id: 'b', foo: false };

      expect(update(store, [updateA, updateB])).to.eql({ allKeys: ['a', 'b'], byKey: { a: updateA, b: updateB } });
    });

    it('adds a new values when key is not recognized', () => {
      const updateC = { id: 'c', foo: true };

      expect(update(store, 'b', updateC)).to.eql({ allKeys: ['a', 'b'], byKey: { ...store.byKey, b: updateC } });
    });
  });
});
