import itemHasWeakPassword from '../itemHasWeakPassword';
import { IItem } from '../../services/getUserItems';

describe('should return true if password do not match requirements (at least 3 of 4)', () => {
  test.each([
    [
      true,
      {
        password: 'pass',
      }
    ],
    [
      true,
      {
        password: 'pass1',
      }
    ],
    [
      false,
      {
        password: 'Pass1',
      }
    ],
    [
      false,
      {
        password: 'Pass1^',
      }
    ],
  ])('should return %s', (expectedResult, item) => {
    expect(itemHasWeakPassword(item as IItem)).toBe(expectedResult);
  })
});