import React, { FC } from "react";
import { Routes } from "~/constants";
import FilterTab from "./components/FilterTab";

import "./filter-style.scss";

interface IFilter {
  weakItemsCount: number;
  oldItemsCount: number;
  reusedItemsCount: number;
}

const Filter: FC<IFilter> = ({
  weakItemsCount,
  reusedItemsCount,
  oldItemsCount,
}: IFilter) => {
  return (
    <div className="filter">
      <FilterTab title="Weak" count={weakItemsCount} path={Routes.Weak} />
      <FilterTab title="Reused" count={reusedItemsCount} path={Routes.Reused} />
      <FilterTab title="Old" count={oldItemsCount} path={Routes.Old} />
    </div>
  );
};

export default Filter;
