import { expect } from 'chai';

import { normalize, patchOne } from '@/store';

describe('store | patch', () => {
  describe('patchOne()', () => {
    const value = { id: 'a', counter: 0 };
    const store = normalize([value]);

    it('patches an existing value by a key', () => {
      expect(patchOne(store, 'a', { counter: 1 })).to.eql({ allKeys: ['a'], byKey: { a: { id: 'a', counter: 1 } } });
    });

    it('patches an existing value by transforming the current value', () => {
      expect(patchOne(store, 'a', ({ counter }) => ({ counter: counter + 2 }))).to.eql({ allKeys: ['a'], byKey: { a: { id: 'a', counter: 2 } } });
    });

    it('does nothing when key is not recognized', () => {
      expect(patchOne(store, 'b', { counter: 1 })).to.eq(store);
    });
  });
});
