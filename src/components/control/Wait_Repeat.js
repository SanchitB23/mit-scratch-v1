import React, {useState} from 'react';
import ItemContainer from "../common/item-container";
import {useDispatch, useSelector} from "react-redux";
import {getEventsSelector} from "../../redux/selectors";
import {setRepeat, setWait} from "../../redux/actions";

const WaitRepeat = ({isWait, comp_id}) => {
  const [value, setValue] = useState(0)
  const dispatch = useDispatch()
  const events = useSelector(getEventsSelector)

  function handleChange(e) {
    let val = parseInt(e.target.value);
    setValue(val);
    if (isWait) {
      let curr = events.wait;
      curr[comp_id] = val;
      dispatch(setWait(curr));
    } else {
      let curr = events.repeat;
      curr[comp_id] = val;
      dispatch(setRepeat(curr));
    }
  }

  return (
      <ItemContainer comp_id={comp_id} handleClick={() => {
      }} classStyles="bg-red-500">
        {isWait ? "Wait" : "Repeat"} <input
          className="text-black text-center w-9/12 mx-2 rounded-lg bg-red-100"
          type="number"
          value={value}
          onChange={handleChange}
          placeholder="Write Something"
          min={0}
      />
        <div
            id={comp_id}
            className="text-center bg-red-600 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        >
          {isWait ? "Wait" : "Repeat"} {value} seconds
        </div>
      </ItemContainer>
  );
};

export default WaitRepeat;
