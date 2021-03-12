import {API} from "~/constants";
import getUrl from "~/utils/getUrl";
import logout from '../services/logout';

export interface IItem {
  title: string,
  description: string,
  password: string,
  createdAt: string,
  id: string
}

const getUserItems = async (userId?: string): Promise<Array<IItem>> => {
  const url = getUrl(API.Items, {
    userId,
  });

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  });

  if (response.status >= 400 && response.status < 600) {
    if (response.status === 401) {
      logout();
    } else {
      throw new Error("Bad response from server");
    }
  } else {
    if (response) {
      const data = await response.json();
      return data.items;
    }
  }

};

export default getUserItems;
