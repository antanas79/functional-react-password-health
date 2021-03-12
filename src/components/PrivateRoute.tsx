import React, { FC, useEffect } from "react";
import { Route, RouteProps, useHistory } from "react-router-dom";
import { Routes } from "~/constants";

const PrivateRoute: FC<RouteProps> = ({ path, component }: RouteProps) => {
  const { push } = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      push(Routes.Login);
    }
  });

  return <Route path={path} component={component} />;
};

export default PrivateRoute;
