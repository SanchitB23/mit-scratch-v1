import React, {Fragment, useState} from "react";
import CatSprite from "../../components/CatSprite";
import ViewTitle from "../../components/common/view-title";
import {useDispatch, useSelector} from "react-redux";
import {getActiveCharacterSelector, getCharacterSelector, getCharactersSelector} from "../../redux/selectors";
import {addCharacter, setActive as setActiveAction} from "../../redux/actions";
import Icon from "../../components/Icon";

export default function Preview() {
  const characters = useSelector(getCharactersSelector)
  const character = useSelector(getCharacterSelector)

  console.log("pp", characters, character)
  const activeCharacter = useSelector(getActiveCharacterSelector)
  const [active, setActive] = useState(activeCharacter);
  const dispatch = useDispatch()
  let elem = null;
  let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

  function dragMouseDown(e, id) {
    console.log("Sprite Mouse Down", e, id)
    elem = document.getElementById(id);
    e ||= window.event
    e.preventDefault()
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:

    elem.style.top = elem.offsetTop - pos2 + "px";
    elem.style.left = elem.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }

  function onChange(e) {
    setActive(e.target.value);
    dispatch(setActiveAction(e.target.value))
  }

  return (<div className="flex-none h-full overflow-y-auto p-2 w-full">
    <div className="flex justify-between items-center">
      <ViewTitle>Preview</ViewTitle>
      <div className="flex flex-col">
        <label htmlFor="characters">Choose a Character:</label>
        <select name="characters" id="characters" value={active} onChange={(event) => onChange(event)}>
          {characters.map(({id}, i) => (
              <option className="capitalize " key={i} value={id}>
                {id}
              </option>
          ))}
        </select>
      </div>
      <button onClick={() => dispatch(addCharacter())}
              className="font-bold mb-5 text-center border border-2 rounded text-black bg-green-100 p-2 w-auto"><Icon
          name="plus" size={15} className="text-green-600 mx-2 inline-block"/>Create
      </button>
    </div>
    <Fragment>
      {characters.map(({id}, i) => (
          <div
              id={`${id}-${i}`}
              key={i}
              className={`absolute`}
              onMouseDown={(e) => dragMouseDown(e, `${id}-${i}`)}
          >
            <div id={`${id}-div`} className="character">
              <div
                  className="hidden border-2 p-1 ml-3 w-auto whitespace-nowrap rounded-full text-center"
                  id={id + "-message-box"}
              />
              <div
                  className="hidden rounded-full border-2 w-4 left-1/2 h-4 ml-3 mb-2 mt-1 whitespace-nowrap"
                  id={id + "-message-box1"}
              />
              <CatSprite char_id={id}/>
            </div>
          </div>
      ))}
    </Fragment>
  </div>);
}
