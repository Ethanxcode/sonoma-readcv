import React, { FC, useState } from 'react';
import cv from '../cv';

interface FolderProps {
  collection: any;
  open: (object: WindowItem) => void;
  focus: (index: number) => void;
  windows: WindowItem[];
}

const Folder: FC<FolderProps> = props => {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);

  return (
    <>
      <div className="fileHeader">
        <div style={{ paddingLeft: 24 }}>Name</div>
        <div>Date</div>
      </div>
      <ul className="fileList">
        {props.collection &&
          props.collection.items.map((item: any, index: number) => {
            return (
              <li
                key={item.heading}
                className={selectedIndex === index ? 'focused' : undefined}
                onDoubleClick={() => {
                  if (props.windows.some(e => e.experience === item)) {
                    let wIndex = props.windows.findIndex(e => e.experience === item);
                    props.focus(wIndex);
                    return;
                  }
                  props.open({
                    type: 'experience',
                    name: item.heading,
                    experience: item,
                  });
                }}
                onMouseDown={() => setSelectedIndex(index)}
              >
                <div className="name">
                  <div className="fileIcon">
                    <img src={cv.media('document.png').url} draggable={false} />
                  </div>
                  <span>{item.heading}</span>
                </div>
                <div className="year">{item.year}</div>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Folder;
