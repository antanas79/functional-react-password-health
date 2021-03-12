import {IItem} from "~/services/getUserItems";
import dayjs from 'dayjs'

const itemOlderThanThirtyDays = (item: IItem): boolean => {
  const {createdAt} = item;
  const isOlder = dayjs(createdAt).isBefore(dayjs().subtract(30, 'days'));
  
  return isOlder;
};

export default itemOlderThanThirtyDays;
