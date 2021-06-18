import { stringToAxes } from './ThreeUtils';

describe('ThreeUtils', () => {
  describe('stringToAxes', () => {
    it('should return null if the parameter does not match the regex', () => {
      expect(stringToAxes('abc')).toBeNull();
    });
  });
});