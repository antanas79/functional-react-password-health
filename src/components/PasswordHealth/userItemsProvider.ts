import {useEffect, useState} from 'react';
import getUserItems, {IItem} from '../../services/getUserItems';

interface IUserItemsProvider {
  isLoading: boolean;
  errorMessage: string;
  items: IItem[],
  reloadItems: () => Promise<void>;
}

const userItemsProvider = (): IUserItemsProvider => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [items, setItems] = useState<Array<IItem>>([])

  useEffect(() => {
    (async () => {
      await reloadItems();
    })()
  }, []);

  const reloadItems = async () => {
    setIsLoading(true);
    try {
      const userItems = await getUserItems();

      setItems(userItems);
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  }

  return {
    isLoading,
    errorMessage,
    items,
    reloadItems
  }
};

export default userItemsProvider;
