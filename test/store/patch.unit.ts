import { expect } from 'chai';

import { normalize, patch, patchMany, patchOne } from '@/store';

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

  describe('patchMany()', () => {
    const value = { id: 'a', counter: 0 };
    const store = normalize([value]);

    it('patches an existing values', () => {
      expect(patchMany(store, [{ key: 'a', value: { counter: 1 } }])).to.eql({ allKeys: ['a'], byKey: { a: { id: 'a', counter: 1 } } });
    });

    it('patches an existing values by transforming the value', () => {
      expect(patchMany(store, [{ key: 'a', value: ({ counter }) => ({ counter: counter + 2 }) }])).to.eql({
        allKeys: ['a'],
        byKey: { a: { id: 'a', counter: 2 } },
      });
    });

    it('does nothing when key is not recognized', () => {
      expect(patchMany(store, [{ key: 'b', value: { counter: 1 } }])).to.eq(store);
    });
  });

  describe('patch()', () => {
    const store = normalize([
      { id: 'a', counter: 0 },
      { id: 'b', counter: 2 },
    ]);

    it('patches one existing value by a key', () => {
      expect(patch(store, 'a', { counter: 1 })).to.eql({ allKeys: ['a', 'b'], byKey: { a: { id: 'a', counter: 1 }, b: { id: 'b', counter: 2 } } });
    });

    it('patches many existing values', () => {
      expect(
        patch(store, [
          { key: 'a', value: { counter: 1 } },
          { key: 'b', value: { counter: 0 } },
        ])
      ).to.eql({ allKeys: ['a', 'b'], byKey: { a: { id: 'a', counter: 1 }, b: { id: 'b', counter: 0 } } });
    });
  });
});
