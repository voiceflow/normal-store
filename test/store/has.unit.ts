import { expect } from 'chai';

import { has, hasCurry, hasMany, hasManyCurry, hasOne, hasOneCurry, normalize } from '@/store';

describe('store | has', () => {
  describe('hasOne()', () => {
    const value = { id: 'a' };
    const store = normalize([value]);

    it('returns true when a key is recognized', () => {
      expect(hasOne(store, 'a')).to.be.true;
    });

    it('returns false when a key is not recognized', () => {
      expect(hasOne(store, 'b')).to.be.false;
    });
  });

  describe('hasOneCurry()', () => {
    const value = { id: 'a' };
    const store = normalize([value]);

    it('returns true when a key is recognized', () => {
      expect(hasOneCurry(store)('a')).to.be.true;
    });

    it('returns false when a key is not recognized', () => {
      expect(hasOneCurry(store)('b')).to.be.false;
    });
  });

  describe('hasMany()', () => {
    const store = normalize([{ id: 'a' }, { id: 'b' }, { id: 'c' }]);

    it('returns true when all keys are recognized', () => {
      expect(hasMany(store, ['c', 'a'])).to.be.true;
    });

    it('returns false if any keys are not recognized', () => {
      expect(hasMany(store, ['d', 'b'])).to.be.false;
    });
  });

  describe('hasManyCurry()', () => {
    const store = normalize([{ id: 'a' }, { id: 'b' }, { id: 'c' }]);

    it('returns true when all keys are recognized', () => {
      expect(hasManyCurry(store)(['c', 'a'])).to.be.true;
    });

    it('returns false if any keys are not recognized', () => {
      expect(hasManyCurry(store)(['d', 'b'])).to.be.false;
    });
  });

  describe('has()', () => {
    const store = normalize([{ id: 'a' }, { id: 'b' }, { id: 'c' }]);

    it('returns true when a key is recognized', () => {
      expect(has(store, 'c')).to.be.true;
    });

    it('returns true when all keys are recognized', () => {
      expect(has(store, ['c', 'a'])).to.be.true;
    });
  });

  describe('hasCurry()', () => {
    const store = normalize([{ id: 'a' }, { id: 'b' }, { id: 'c' }]);

    it('returns true when a key is recognized', () => {
      expect(hasCurry(store)('c')).to.be.true;
    });

    it('returns true when all keys are recognized', () => {
      expect(hasCurry(store)(['c', 'a'])).to.be.true;
    });
  });
});
