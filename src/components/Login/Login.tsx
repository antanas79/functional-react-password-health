import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Routes } from "~/constants";
import login from "~/services/login";
import ErrorBlock from "../ErrorBlock";
import LoadingScreen from "../LoadingScreen";

import "./login-style.scss";

const Login = (): JSX.Element => {
  const { push } = useHistory();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isMountedRef = useRef(null);

  useEffect((): (() => void) => {
    isMountedRef.current = true;
    if (isChanged) {
      handleValidation();
    }
    return () => (isMountedRef.current = false);
  }, [username, password, isChanged]);

  const handleValidation = () => {
    if (
      (!username || username?.length < 1) &&
      (!password || password?.length < 1)
    ) {
      setErrorMessage("Username and password fields can't be empty!");
      return false;
    } else if (!username || username?.length < 1) {
      setErrorMessage("Username field can't be empty!");
      return false;
    } else if (!password || password?.length < 1) {
      setErrorMessage("Password field can't be empty!");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      await login(username, password);
      push(Routes.PasswordHealth);
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="text-center">Password Health</h1>
        <input
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
            setIsChanged(true);
          }}
          placeholder="Username"
          type="text"
          className="input mt-52px"
        />
        <input
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setIsChanged(true);
          }}
          placeholder="Password"
          type="password"
          className="input mt-12px"
        />
        {isLoading && <LoadingScreen />}
        <ErrorBlock error={errorMessage} />
        <button
          disabled={!isChanged || errorMessage?.length > 0 ? true : false}
          type="submit"
          className={`button ${errorMessage ? "mt-0px" : "mt-24px"} ${
            !isChanged || errorMessage?.length > 0 ? "disabled" : ""
          }`}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
