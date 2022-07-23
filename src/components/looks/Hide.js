import React from 'react';
import {useSelector} from "react-redux";
import {getActiveCharacterSelector} from "../../redux/selectors";
import ItemContainer from "../common/item-container";

const Hide = ({comp_id, shouldHideCharacter, shouldShowCharacter}) => {
  const activeCharacter = useSelector(getActiveCharacterSelector)

  const onHide = () => {
    if (shouldHideCharacter) {
      const el = document.getElementById(activeCharacter);
      el.style.display = "none";
    }
    clearTimeout()
    const el = document.getElementById(`${activeCharacter}-message-box`);
    const el2 = document.getElementById(`${activeCharacter}-message-box1`);
    el.style.display = "none";
    el2.style.display = "none";
  }
  const onShow = () => {
    const el = document.getElementById(activeCharacter);
    el.style.display = "inline-block";
  }
  if (shouldShowCharacter) {
    return (
        <ItemContainer comp_id={comp_id} handleClick={onShow} classStyles="justify-center bg-purple-500">
          Show
        </ItemContainer>
    );
  }
  return (
      <ItemContainer comp_id={comp_id} handleClick={onHide} color="purple" classStyles="justify-center">
        {`Hide ${!shouldHideCharacter ? 'Message' : ''}`}
      </ItemContainer>
  );
};

export default Hide;
