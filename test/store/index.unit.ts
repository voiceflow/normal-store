import { expect } from 'chai';

import { createEmpty, denormalize, normalize } from '@/store';

describe('store', () => {
  describe('normalize()', () => {
    it('creates a store of identifiable objects', () => {
      const store = normalize([{ id: 'a' }, { id: 'b' }]);

      expect(store).to.eql({ allKeys: ['a', 'b'], byKey: { a: { id: 'a' }, b: { id: 'b' } } });
    });

    it('creates a store of objects with custom keys', () => {
      const store = normalize([{ label: 'a' }, { label: 'b' }], (value) => value.label);

      expect(store).to.eql({ allKeys: ['a', 'b'], byKey: { a: { label: 'a' }, b: { label: 'b' } } });
    });
  });

  describe('denormalize()', () => {
    it('extracts objects from a normalized store into a list', () => {
      const values = [{ id: 'a' }, { id: 'b' }];
      const store = normalize(values);

      expect(denormalize(store)).to.eql(values);
    });
  });

  describe('createEmpty()', () => {
    it('creates an empty normalized store', () => {
      expect(createEmpty()).to.eql({ allKeys: [], byKey: {} });
    });
  });
});
