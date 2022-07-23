import React, {useState} from 'react';
import ItemContainer from "../common/item-container";
import {useSelector} from "react-redux";
import {getActiveCharacterSelector} from "../../redux/selectors";

const Move = ({comp_id, isMoveX}) => {
  const [steps, setSteps] = useState(0);
  const character = useSelector(getActiveCharacterSelector)

  const handleClick = () => {
    console.log("move clicked")
    const el = document.getElementById(`${character}-div`);
    let left = el.offsetLeft;
    el.style.position = "relative";
    el.style.left = left + steps + "px";
  };
  //fixme on input change click is calling
  const onInputChange = (e) => {
    e.stopPropagation()
    if (isNaN(e.target.value)) return
    setSteps(parseInt(e.target.value))
  }
  return (
      <ItemContainer comp_id={comp_id} handleClick={handleClick} color="blue">
        Move{" "}
        <input
            type="number"
            className="text-black text-center w-16 mx-2 rounded-lg bg-blue-100"
            value={steps}
            onChange={onInputChange}
        />{" "}
        steps
      </ItemContainer>
  );
};

export default Move;
