import React, { FC } from "react";
import { IItem } from "~/services/getUserItems";
import ItemIcon from "./components/ItemIcon";
import UpdateModal from "../Modal/Modal";

import "./list-style.scss";

interface IList {
  items: Array<IItem>;
  reloadItems: () => Promise<void>;
}

const List: FC<IList> = ({ items, reloadItems }: IList) => (
  <ul className="list">
    {items.map((item) => (
      <li className="item" key={item.id}>
        <ItemIcon title={item.title} />
        <div>
          <div className="title">{item.title}</div>
          <div className="description">{item.description}</div>
        </div>
        <UpdateModal item={item} reloadItems={reloadItems} />
      </li>
    ))}
  </ul>
);

export default List;
