import itemOlderThanThirtyDays from '../itemOlderThanThirtyDays';
import testItems from '../../utils/testItems/testItems';
import { IItem } from '../../services/getUserItems';

describe('should return true if password older than thirty days', () => {
  test.each([
    [
      true,
      testItems.items[0]
    ],
    [
      false,
      testItems.items[1]
    ],
    [
      true,
      testItems.items[2]
    ],
    [
      false,
      testItems.items[3]
    ],
    [
      false,
      testItems.items[4]
    ],
    [
      false,
      testItems.items[5]
    ],
    [
      false,
      testItems.items[6]
    ],
    [
      true,
      testItems.items[7]
    ],
    [
      true,
      testItems.items[8]
    ],
    
  ])('should return %s', (expectedResult, item) => {
    expect(itemOlderThanThirtyDays(item as IItem)).toBe(expectedResult);
  })
});