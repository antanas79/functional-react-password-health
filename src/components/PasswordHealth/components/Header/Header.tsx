import React, { FC } from "react";
import logout from "../../../../services/logout";

import "./header-style.scss";

interface IHeader {
  username: string;
  vulnerableItemsCount: number;
}

const Header: FC<IHeader> = ({ username, vulnerableItemsCount }: IHeader) => {
  return (
    <div className="header">
      <div className="user-section">
        <button onClick={logout}>{`Logout ${username}`}</button>
      </div>
      <h1>{`${vulnerableItemsCount} Items are vulnerable`}</h1>
      <span>Create new complex passwords to protect your accounts</span>
    </div>
  );
};

export default Header;
