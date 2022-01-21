import { expect } from 'chai';

import { appendUnique, prependUnique, stringify, withoutValue, withoutValues } from '@/utils';

describe('utils', () => {
  describe('stringify()', () => {
    it('string to string', () => {
      expect(stringify('')).to.eql('');
      expect(stringify('str')).to.eql('str');
    });

    it('number to string', () => {
      expect(stringify(0)).to.eql('0');
      expect(stringify(10)).to.eql('10');
      expect(stringify(100000)).to.eql('100000');
    });

    it('object to string', () => {
      expect(stringify({})).to.eql('[object Object]');
    });
  });

  describe('withoutValue()', () => {
    it('empty array', () => {
      expect(withoutValue([], 1)).to.eql([]);
    });

    it('unexisting value', () => {
      expect(withoutValue([0, 2, 3], 4)).to.eql([0, 2, 3]);
      expect(withoutValue([1, 2, 3], 0)).to.eql([1, 2, 3]);
    });

    it('works correctly', () => {
      expect(withoutValue([0, 1, 2], 0)).to.eql([1, 2]);
      expect(withoutValue([0, 1, 2], 1)).to.eql([0, 2]);
      expect(withoutValue([0, 1, 2], 2)).to.eql([0, 1]);
    });
  });

  describe('withoutValues()', () => {
    it('empty array', () => {
      expect(withoutValues([], [])).to.eql([]);
      expect(withoutValues([], [1])).to.eql([]);
    });

    it('unexisting values', () => {
      expect(withoutValues([1, 2, 3], [4, 5])).to.eql([1, 2, 3]);
      expect(withoutValues([1, 2, 3], [0, 100])).to.eql([1, 2, 3]);
    });

    it('mixed values', () => {
      expect(withoutValues([0, 1, 2, 3], [0, 2, 5])).to.eql([1, 3]);
      expect(withoutValues([1, 2, 3], [0, 1, 3, 5])).to.eql([2]);
    });

    it('clean all', () => {
      expect(withoutValues([1, 2, 3], [1, 2, 3])).to.eql([]);
      expect(withoutValues([1, 2, 3], [0, 1, 2, 3, 4])).to.eql([]);
    });
  });

  describe('appendUnique()', () => {
    it('existing value', () => {
      expect(appendUnique([0, 1, 2], 0)).to.eql([0, 1, 2]);
      expect(appendUnique([0, 1, 2], 1)).to.eql([0, 1, 2]);
      expect(appendUnique([0, 1, 2], 2)).to.eql([0, 1, 2]);
    });

    it('unexisting value', () => {
      expect(appendUnique([1, 2], 0)).to.eql([1, 2, 0]);
      expect(appendUnique([0, 2], 1)).to.eql([0, 2, 1]);
      expect(appendUnique([0, 1], 2)).to.eql([0, 1, 2]);
    });
  });

  describe('prependUnique()', () => {
    it('existing value', () => {
      expect(prependUnique([0, 1, 2], 0)).to.eql([0, 1, 2]);
      expect(prependUnique([0, 1, 2], 1)).to.eql([0, 1, 2]);
      expect(prependUnique([0, 1, 2], 2)).to.eql([0, 1, 2]);
    });

    it('unexisting value', () => {
      expect(prependUnique([1, 2], 0)).to.eql([0, 1, 2]);
      expect(prependUnique([0, 2], 1)).to.eql([1, 0, 2]);
      expect(prependUnique([0, 1], 2)).to.eql([2, 0, 1]);
    });
  });
});
