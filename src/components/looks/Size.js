import React, {useState} from 'react';
import ItemContainer from "../common/item-container";
import {useSelector} from "react-redux";
import {getActiveCharacterSelector} from "../../redux/selectors";

const Size = ({comp_id}) => {
  const activeCharacter = useSelector(getActiveCharacterSelector)

  const [state, setState] = useState({
    scale: 1,
  });
  const changeSize = () => {
    const el = document.getElementById(activeCharacter);
    el.style.transform = `scale(${state.scale})`;
  };
  console.log("size", comp_id)
  return (
      <ItemContainer handleClick={() => {
      }}  classStyles="bg-purple-500">
        <div className="grid grid-cols-2 my-2">
          <div className="text-white">Size:</div>
          <input
              className="text-black text-center w-9/12 mx-2 rounded-lg bg-blue-100"
              type="number"
              value={state.scale}
              min={0}
              onChange={(e) =>
                  setState({...state, scale: parseInt(e.target.value)})
              }
          />
        </div>
        <div
            id={comp_id}
            className="text-center bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer"
            onClick={changeSize}
        >
          Size {state.scale}
        </div>
      </ItemContainer>
  );
};

export default Size;
