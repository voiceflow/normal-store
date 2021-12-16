import { expect } from 'chai';

import { get, getMany, getOne, normalize } from '@/store';

describe('store | get', () => {
  describe('getOne()', () => {
    const value = { id: 'a' };
    const store = normalize([value]);

    it('returns a value from a store by a key', () => {
      expect(getOne(store, 'a')).to.eq(value);
    });

    it('returns null when a key is not recognized', () => {
      expect(getOne(store, 'b')).to.be.null;
    });
  });

  describe('getMany()', () => {
    const store = normalize([{ id: 'a' }, { id: 'b' }, { id: 'c' }]);

    it('returns many values from a store by their keys', () => {
      expect(getMany(store, ['c', 'a'])).to.eql([{ id: 'c' }, { id: 'a' }]);
    });

    it('excludes items from the returned array when a key is not recognized', () => {
      expect(getMany(store, ['d', 'b'])).to.eql([{ id: 'b' }]);
    });
  });

  describe('get()', () => {
    const store = normalize([{ id: 'a' }, { id: 'b' }, { id: 'c' }]);

    it('returns a value from a store by a key', () => {
      expect(get(store, 'c')).to.eql({ id: 'c' });
    });

    it('returns many values from a store by their keys', () => {
      expect(get(store, ['c', 'a'])).to.eql([{ id: 'c' }, { id: 'a' }]);
    });
  });
});
