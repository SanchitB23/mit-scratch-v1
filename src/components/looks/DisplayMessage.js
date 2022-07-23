import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {getActiveCharacterSelector} from "../../redux/selectors";
import ItemContainer from "../common/item-container";

const DisplayMessage = ({comp_id, hasTimer, isThinking}) => {
  const [state, setState] = useState({
    showMessage: false,
    message: "",
    character_id: "",
    timer: 0
  })
  const activeCharacter = useSelector(getActiveCharacterSelector)
  /* Display Message */
  const displayMessage = () => {
    if (!state.message) return;
    const el = document.getElementById(`${activeCharacter}-message-box`);
    const el2 = document.getElementById(`${activeCharacter}-message-box1`);
    el2.style.display = "none";

    if (state.show_msg && state.character_id === activeCharacter) {
      setState({...state, show_msg: false});
      el.style.display = "none";
      el2.style.display = "none";
      return;
    }
    setState({...state, show_msg: true});
    el.style.display = "block";
    el.style.position = "relative";

    if (isThinking) {
      el2.style.display = "block";
      el2.style.position = "relative";
    }

    el.innerHTML = state.message;
    if (hasTimer) setTimeout(() => {
      setState({...state, show_msg: false});
      el.style.display = "none";
      el2.style.display = "none";
    }, state.timer * 1000);
  };

  return (
      <ItemContainer handleClick={() => {
      }} color="purple">
        <div> {isThinking ? "Think" : "Say"} <input
            className="text-black text-center w-9/12 mx-2 rounded-lg bg-blue-100"
            type="text"
            value={state.message}
            onChange={(e) => {
              setState({...state, message: e.target.value});
            }}
            placeholder="Write Something"
        /></div>
        {hasTimer && <div className="pt-2">for <input
            className="text-black text-center w-9/12 mx-2 rounded-lg bg-blue-100"
            type="number"
            value={state.timer}
            min={0}
            onChange={(e) => setState({...state, timer: parseInt(e.target.value)})}
        /></div>}
        <div
            id={comp_id}
            className="flex justify-center	 text-center flex-row flex-wrap bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer"
            onClick={() => displayMessage()}
        >
          {isThinking ? `Think ${state.message}` : `Say ${state.message}`}
        </div>
      </ItemContainer>
  );
};

export default DisplayMessage;
