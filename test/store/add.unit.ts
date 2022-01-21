import { expect } from 'chai';

import { append, appendOne, normalize, prepend, prependOne } from '@/store';

describe('store | add', () => {
  describe('prependOne()', () => {
    it('prepend a single value to a store', () => {
      const store = normalize([{ id: 'a' }]);

      expect(prependOne(store, 'b', { id: 'b' })).to.eql({ allKeys: ['b', 'a'], byKey: { a: { id: 'a' }, b: { id: 'b' } } });
    });
  });

  describe('appendOne()', () => {
    it('append a single value to a store', () => {
      const store = normalize([{ id: 'a' }]);

      expect(appendOne(store, 'b', { id: 'b' })).to.eql({ allKeys: ['a', 'b'], byKey: { a: { id: 'a' }, b: { id: 'b' } } });
    });
  });

  describe('prepend()', () => {
    it('prepend a single value to a store', () => {
      const store = normalize([{ id: 'a' }]);

      expect(prepend(store, 'b', { id: 'b' })).to.eql({ allKeys: ['b', 'a'], byKey: { a: { id: 'a' }, b: { id: 'b' } } });
    });

    it('prepend multiple values to a store', () => {
      const store = normalize([{ id: 'a' }]);

      expect(prepend(store, [{ id: 'b' }, { id: 'c' }])).to.eql({
        allKeys: ['b', 'c', 'a'],
        byKey: { a: { id: 'a' }, b: { id: 'b' }, c: { id: 'c' } },
      });
    });

    it('prepend multiple values with id getter to a store', () => {
      const store = normalize([{ key: 'a' }], (value) => value.key);

      expect(prepend(store, [{ key: 'b' }, { key: 'c' }], (value) => value.key)).to.eql({
        allKeys: ['b', 'c', 'a'],
        byKey: { a: { key: 'a' }, b: { key: 'b' }, c: { key: 'c' } },
      });
    });
  });

  describe('append()', () => {
    it('append a single value to a store', () => {
      const store = normalize([{ id: 'a' }]);

      expect(append(store, 'b', { id: 'b' })).to.eql({ allKeys: ['a', 'b'], byKey: { a: { id: 'a' }, b: { id: 'b' } } });
    });

    it('append multiple values to a store', () => {
      const store = normalize([{ id: 'a' }]);

      expect(append(store, [{ id: 'b' }, { id: 'c' }])).to.eql({
        allKeys: ['a', 'b', 'c'],
        byKey: { a: { id: 'a' }, b: { id: 'b' }, c: { id: 'c' } },
      });
    });

    it('append multiple values with id getter to a store', () => {
      const store = normalize([{ key: 'a' }], (value) => value.key);

      expect(append(store, [{ key: 'b' }, { key: 'c' }], (value) => value.key)).to.eql({
        allKeys: ['a', 'b', 'c'],
        byKey: { a: { key: 'a' }, b: { key: 'b' }, c: { key: 'c' } },
      });
    });
  });
});
