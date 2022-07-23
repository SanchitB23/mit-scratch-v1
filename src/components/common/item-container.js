import React from 'react';

const ItemContainer = ({children, color, comp_id, handleClick, classStyles}) => {
  return (
      <div className="shadow-md">
        <div
            id={comp_id}
            className={`flex flex-row flex-wrap bg-${color}-500 text-white px-2 py-1 my-2 text-sm cursor-pointer ` + classStyles}
            onClick={handleClick}
        >
          {children}
        </div>
      </div>
  );
};

export default ItemContainer;
