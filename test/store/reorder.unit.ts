import { expect } from 'chai';

import { normalize, reorder } from '@/store';

describe('store | reorder', () => {
  describe('reorder()', () => {
    const store = normalize([{ id: 'a' }, { id: 'b' }, { id: 'c' }]);

    it('reorder the keys in a store', () => {
      expect(reorder(store, ['b', 'c', 'a'])).to.eql({ ...store, allKeys: ['b', 'c', 'a'] });
    });
  });
});
