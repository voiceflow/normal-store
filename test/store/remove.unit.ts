import { expect } from 'chai';

import { normalize, remove, removeMany, removeOne } from '@/store';

describe('store | remove', () => {
  describe('removeOne()', () => {
    const value = { id: 'a' };
    const store = normalize([value]);

    it('removes a value from a store', () => {
      expect(removeOne(store, 'a')).to.eql({ allKeys: [], byKey: {} });
    });

    it('does nothing when a key is not recognized', () => {
      expect(removeOne(store, 'b')).to.eql(store);
    });
  });

  describe('removeMany()', () => {
    const store = normalize([{ id: 'a' }, { id: 'b' }, { id: 'c' }]);

    it('removes all values by recognized keys', () => {
      expect(removeMany(store, ['c', 'a', 'd'])).to.eql({ allKeys: ['b'], byKey: { b: { id: 'b' } } });
    });
  });

  describe('remove()', () => {
    const store = normalize([{ id: 'a' }, { id: 'b' }, { id: 'c' }]);

    it('removes a value from a store', () => {
      expect(remove(store, 'c')).to.eql({ allKeys: ['a', 'b'], byKey: { a: { id: 'a' }, b: { id: 'b' } } });
    });

    it('removes all values by keys', () => {
      expect(remove(store, ['c', 'a'])).to.eql({ allKeys: ['b'], byKey: { b: { id: 'b' } } });
    });
  });
});
