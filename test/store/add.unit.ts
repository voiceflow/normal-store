import { expect } from 'chai';

import { appendOne, normalize, prependOne } from '@/store';

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
});
