import { API } from '~/constants';
import getUrl from '../utils/getUrl';


const login = async (username: string, password: string): Promise<void> => {
  const url = getUrl(API.Login, {
    username,
    password,
  });

  const response = await fetch(url);

  if (response.status >= 400 && response.status < 600) {
    if (response.status === 401) {
      throw new Error("Incorrect username or password!");
    } else {
      throw new Error("Bad response from server");
    }
  } else {
    if (response) {
      const data = await response.json();
      const { token } = data;
      if (token) {
        localStorage.setItem('token', token);
      }
    }
  }

 
};

export default login;
