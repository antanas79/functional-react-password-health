import { passwords } from '../data';
import { IItem } from "../../src/services/getUserItems";

const items: IItem[] = [];

export const updateItem = (item: IItem): void => {
  const index = items.findIndex(updatedItem => updatedItem.id === item.id); 
  if (index >= 0) {
    items.splice(index, 1);
  }
  items.push(item);
};

export const getItems = (): IItem[] => {
  return passwords.map((passwordItem) => {
    const updatedItem = items.find(({ id }) => id === passwordItem.id);

    return {
      ...(updatedItem || passwordItem),
    };
  })
};



