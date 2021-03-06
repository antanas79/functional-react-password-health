import React, { FC } from "react";
import { Route, RouteProps, useHistory } from "react-router-dom";
import { Routes } from "~/constants";

const PublicRoute: FC<RouteProps> = ({ path, component }: RouteProps) => {
  const { push } = useHistory();
  const token = localStorage.getItem("token");

  if (token) {
    push(Routes.PasswordHealth);
  }

  return <Route path={path} component={component} />;
};

export default PublicRoute;
