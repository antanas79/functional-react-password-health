import React from "react";
import List from "./components/List/List";
import userItemsProvider from "./userItemsProvider";
import ErrorBlock from "../ErrorBlock";
import Filter from "./components/Filter/Filter";
import LoadingScreen from "../LoadingScreen";
import Header from "./components/Header/Header";
import { Route, Switch } from "react-router-dom";
import { Routes } from "~/constants";
import { useUserContext } from "../UserContext";
import itemHasWeakPassword from "~/utils/itemHasWeakPassword";
import itemHasReusedPassword from "~/utils/itemHasReusedPassword";
import itemOlderThanThirtyDays from "~/utils/itemOlderThanThirtyDays";

const PasswordHealth = (): JSX.Element => {
  const {
    errorMessage: userProviderErrorMessage,
    isLoading: userDataIsLoading,
    username,
  } = useUserContext();

  const { items, isLoading, errorMessage, reloadItems } = userItemsProvider();

  const uniqueVulnerableItemsIdsCount = items.reduce(
    (count, item) =>
      itemHasWeakPassword(item) ||
      itemHasReusedPassword(item, items) ||
      itemOlderThanThirtyDays(item)
        ? count + 1
        : count,
    0
  );
  const weakItemsCount = items.reduce(
    (count, item) => (itemHasWeakPassword(item) ? count + 1 : count),
    0
  );

  const reusedItemsCount = items.reduce(
    (count, item) => (itemHasReusedPassword(item, items) ? count + 1 : count),
    0
  );

  const oldItemsCount = items.reduce(
    (count, item) => (itemOlderThanThirtyDays(item) ? count + 1 : count),
    0
  );

  if (isLoading || userDataIsLoading) {
    return <LoadingScreen />;
  }

  if (userProviderErrorMessage || errorMessage) {
    return <ErrorBlock error={userProviderErrorMessage || errorMessage} />;
  }

  return (
    <div className="container">
      <Header
        username={username}
        vulnerableItemsCount={uniqueVulnerableItemsIdsCount}
      />
      <Filter
        oldItemsCount={oldItemsCount}
        weakItemsCount={weakItemsCount}
        reusedItemsCount={reusedItemsCount}
      />
      <Switch>
        <Route exact path={Routes.PasswordHealth}>
          <List items={items} reloadItems={reloadItems} />
        </Route>
        <Route path={Routes.Weak}>
          <List
            items={items.filter(itemHasWeakPassword)}
            reloadItems={reloadItems}
          />
        </Route>
        <Route path={Routes.Reused}>
          <List
            items={
              items?.length > 0
                ? items.filter((item) => itemHasReusedPassword(item, items))
                : null
            }
            reloadItems={reloadItems}
          />
        </Route>
        <Route path={Routes.Old}>
          <List
            items={
              items?.length > 0
                ? items.filter((item) => itemOlderThanThirtyDays(item))
                : null
            }
            reloadItems={reloadItems}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default PasswordHealth;
