import React, {Fragment, useState} from 'react';
import ItemContainer from "../common/item-container";
import {getActiveCharacterSelector} from "../../redux/selectors";
import {useSelector} from "react-redux";

const GoTo = ({comp_id, isY, isX}) => {
  const [state, setState] = useState({
    goto_x: 0,
    goto_y: 0,
  });
  const activeCharacter = useSelector(getActiveCharacterSelector)

  const gotoXY = () => {
    const el = document.getElementById(`${activeCharacter}-div`);
    el.style.position = "relative";
    if (isX) el.style.left = state.goto_x + "px";
    if (isY) el.style.top = state.goto_y + "px";
    console.log("goto", state, isX, isY, activeCharacter)
  }
  return (
      <ItemContainer comp_id={comp_id} handleClick={gotoXY} color="blue">
        Go to {isX && <Fragment>X : <input
          className="text-black text-center w-10 mx-2 rounded-lg bg-blue-100"
          type="number"
          value={state.goto_x}
          onChange={(e) => {
            parseInt(e.target.value) !== 0 &&
            setState({...state, goto_x: parseInt(e.target.value)});
          }}
      /></Fragment>} {
          isY && <Fragment>Y : <input
              className="text-black text-center w-10 mx-2 rounded-lg bg-blue-100"
              type="number"
              value={state.goto_y}
              onChange={(e) => {
                parseInt(e.target.value) !== 0 &&
                setState({...state, goto_y: parseInt(e.target.value)});
              }}
          /></Fragment>
      }
      </ItemContainer>

  );
};

export default GoTo;
