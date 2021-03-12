import itemHasReusedPassword from '../itemHasReusedPassword';
import testItems from '../../utils/testItems/testItems';

test('should return true if there is more than one item with same password', () => {
   expect(itemHasReusedPassword(testItems.items[0], testItems.items)).toBe(false);
   expect(itemHasReusedPassword(testItems.items[1], testItems.items)).toBe(true);
   expect(itemHasReusedPassword(testItems.items[2], testItems.items)).toBe(true);
   expect(itemHasReusedPassword(testItems.items[3], testItems.items)).toBe(true);
});