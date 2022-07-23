import React, {useState} from 'react';
import Icon from "../Icon";
import ItemContainer from "../common/item-container";
import {useDispatch, useSelector} from "react-redux";
import {getActiveCharacterSelector, getCharactersSelector} from "../../redux/selectors";
import {setCharacterAngle} from "../../redux/actions";

const Turn = ({comp_id, isClockwise}) => {
  const [angle, setAngle] = useState(0);
  const characters = useSelector(getCharactersSelector)
  const activeCharacter = useSelector(getActiveCharacterSelector)
  const dispatch = useDispatch()

  const handleClick = () => {
    console.log("Turn clicked", angle, isClockwise, activeCharacter)
    const el = document.getElementById(activeCharacter);
    const character_angle = characters.find(x => x.id === activeCharacter);
    const finalAngle = isClockwise ? character_angle.angle + angle : character_angle.angle + (angle * -1)
    if (character_angle) {
      el.style.transform = `rotate(${finalAngle}deg)`;
      dispatch(setCharacterAngle(finalAngle))
    }
  };
  return (
      <ItemContainer comp_id={comp_id} handleClick={handleClick} color="blue">
        {"Turn "}
        <Icon name={isClockwise ? "redo" : "undo"} size={15} className="text-white mx-2"/>
        <input
            type="number"
            className="text-black text-center w-16 mx-2 rounded-lg bg-blue-100"
            value={angle}
            onChange={(e) => setAngle(parseInt(e.target.value))}
        />{" degrees"}
      </ItemContainer>
  );
};

export default Turn;
