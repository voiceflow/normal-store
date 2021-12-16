import { expect } from 'chai';

import { normalize, updateOne } from '@/store';

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
});
