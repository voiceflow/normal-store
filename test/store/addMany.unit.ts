import { expect } from 'chai';

import { appendMany, normalize, prependMany } from '@/store';

describe('store | add many', () => {
  describe('prependMany()', () => {
    it('prepend many values to a store', () => {
      const store = normalize([{ id: 'a' }]);

      expect(prependMany(store, [{ id: 'b' }, { id: 'c' }])).to.eql({
        allKeys: ['b', 'c', 'a'],
        byKey: { a: { id: 'a' }, b: { id: 'b' }, c: { id: 'c' } },
      });
    });

    it('prepend many values to a store with custom keys', () => {
      const getLabel = (value: { label: string }): string => value.label;
      const store = normalize([{ label: 'a' }], getLabel);

      expect(prependMany(store, [{ label: 'b' }, { label: 'c' }], getLabel)).to.eql({
        allKeys: ['b', 'c', 'a'],
        byKey: { a: { label: 'a' }, b: { label: 'b' }, c: { label: 'c' } },
      });
    });
  });

  describe('appendMany()', () => {
    it('append many values to a store', () => {
      const store = normalize([{ id: 'a' }]);

      expect(appendMany(store, [{ id: 'b' }, { id: 'c' }])).to.eql({
        allKeys: ['a', 'b', 'c'],
        byKey: { a: { id: 'a' }, b: { id: 'b' }, c: { id: 'c' } },
      });
    });

    it('append many values to a store with custom keys', () => {
      const getLabel = (value: { label: string }): string => value.label;
      const store = normalize([{ label: 'a' }], getLabel);

      expect(appendMany(store, [{ label: 'b' }, { label: 'c' }], getLabel)).to.eql({
        allKeys: ['a', 'b', 'c'],
        byKey: { a: { label: 'a' }, b: { label: 'b' }, c: { label: 'c' } },
      });
    });
  });
});
