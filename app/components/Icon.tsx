import React, { FC, ReactNode } from 'react';

interface IconProps {
  icon?: ReactNode;
  collection: {
    name: string;
    type?: string;
    status?: string;
  };
  open: () => void;
}
const Icon: FC<IconProps> = props => {
  return (
    <div onDoubleClick={props.open} tabIndex={0} className="desktopItem">
      <div className="icon">{props.icon ? props.icon : null}</div>
      <div className="label">{props.collection.name}</div>
    </div>
  );
};

export default Icon;
