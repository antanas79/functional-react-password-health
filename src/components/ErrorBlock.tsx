import React, { FC, memo } from "react";

interface IErrorBlock {
  error: string;
}

const ErrorBlock: FC<IErrorBlock> = ({ error }: IErrorBlock) => {
  if (!error) {
    return null;
  }

  return <div className="input my-12px">{error}</div>;
};

export default memo(ErrorBlock);
