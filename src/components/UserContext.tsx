import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { API } from "~/constants";
import getUrl from "~/utils/getUrl";
import logout from "../services/logout";

interface IUser {
  updateUser: () => void;
  deleteData: () => void;
  errorMessage: string;
  isLoading: boolean;
  username: string;
  email: string;
  id: string;
}

const UserContext = createContext<IUser>({
  updateUser: null,
  deleteData: null,
  errorMessage: null,
  isLoading: true,
  username: null,
  email: null,
  id: null,
});

export const useUserContext = (): IUser => useContext(UserContext);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState<string>(null);
  const [email, setEmail] = useState<string>(null);
  const [id, setId] = useState<string>(null);
  const ac = useRef(new AbortController());

  const updateUser = async () => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch(getUrl(API.User), {
        signal: ac.current.signal,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status >= 400 && response.status < 600) {
        if (response.status === 401) {
          setErrorMessage("Incorrect token!");
          deleteData();
          logout();
        } else {
          setErrorMessage("Bad response from server!");
        }
      } else {
        if (response) {
          const data = await response.json();
          setUsername(data?.username);
          setEmail(data?.email);
          setId(data?.id);
        }
      }

      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      throw error;
    }

    setIsLoading(false);
  };

  const deleteData = () => {
    setErrorMessage(null);
    setIsLoading(false);
    setUsername(null);
    setEmail(null);
    setId(null);
  };

  useEffect(() => {
    updateUser();
    return () => ac.current.abort();
  }, []);

  const value = {
    updateUser,
    deleteData,
    errorMessage,
    isLoading,
    username,
    email,
    id,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
