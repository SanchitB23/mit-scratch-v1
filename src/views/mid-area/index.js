import React from "react";
import ViewTitle from "../../components/common/view-title";
import {Draggable, Droppable} from "react-beautiful-dnd";
import getComponent from "../../helpers/getComponents";
import {useDispatch, useSelector} from "react-redux";
import {getEventsSelector, getListSelector} from "../../redux/selectors";
import {addList} from "../../redux/actions";


export default function MidArea() {
  const dispatch = useDispatch()
  const event_values = useSelector(getEventsSelector)
  const {midAreaLists: list} = useSelector(getListSelector)
  console.log("midList", list)
  const eventFire = (el, etype) => {
    if (el && el.fireEvent) {
      el.fireEvent("on" + etype);
    } else if (el) {
      const evObj = document.createEvent("Events");
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  };

  // Handle Running the list
  const handleClick = (arr, id) => {
    if (arr.length === 0) return;
    let i = 0;

    let repeat = 1;

    let str1 = `comp${arr[i]}-${id}-${i}`;

    // Handle Wait at first index
    if (arr[i] === "WAIT") {
      let str2 = `comp${arr[i]}-${id}-${i}`;
      let last_time = new Date().getTime();
      let curr_time = new Date().getTime();

      while ((curr_time - last_time) / 1000 < event_values.wait[str2] - 2) {
        curr_time = new Date().getTime();
      }
    }

    // Handle Repeat at first index
    else if (arr[i] !== "REPEAT") {
      eventFire(document.getElementById(str1), "click");
    } else {
      repeat = event_values.repeat[str1] + 1;
    }
    i++;

    /* Each function execution takes 2 seconds */
    const cnt = setInterval(() => {
      if (i === arr.length) {
        clearInterval(cnt);
      }

      // Handle Wait
      if (arr[i] === "WAIT") {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        let last_time = new Date().getTime();
        let curr_time = new Date().getTime();

        while ((curr_time - last_time) / 1000 < event_values.wait[str2] - 2) {
          curr_time = new Date().getTime();
        }
        i++;
      }
      // Handle Repeat Component at current index
      else if (arr[i] === "REPEAT") {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        repeat = repeat * (event_values.repeat[str2] + 1);
        i++;
      }
      // If Repeat component is at previous index
      else if (arr[i - 1] === "REPEAT" && repeat > 2) {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        eventFire(document.getElementById(str2), "click");
        repeat--;
      } else {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        eventFire(document.getElementById(str2), "click");
        i++;
      }
    }, 1000);
  };

  return <div className="flex-1 h-full p-2 overflow-auto md:w-1/4">
    <div className="flex justify-between"><ViewTitle>Mid Area</ViewTitle>
      <button
          onClick={() => dispatch(addList())}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
        New List
      </button>
    </div>
    <div className="grid grid-gap-2 grid-cols-1 md:grid-cols-2 h-full">
      {list.map(({comps, id}) => (
          <div className="w-60" key={id}>
            <div className="p-4 shadow-md">
              <div className="w-52 border border-2 border-gray-300 p-2">
                <Droppable droppableId={id} type="COMPONENTS">
                  {(provided) => {
                    return (
                        <ul
                            className={`${id} w-48 h-full`}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                          <div className="text-center mx-auto my-2 mb-4">
                            <button
                                onClick={() => handleClick(comps, id)}
                                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                              run
                            </button>
                          </div>

                          {comps &&
                              comps.map((x, i) => {
                                let str = `${x}`;
                                let component_id = `comp${str}-${id}-${i}`;

                                return (
                                    <Draggable
                                        key={`${str}-${id}-${i}`}
                                        draggableId={`${str}-${id}-${i}`}
                                        index={i}
                                    >
                                      {(provided) => (
                                          <li
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                          >
                                            {getComponent(str, component_id)}
                                            {provided.placeholder}
                                          </li>
                                      )}
                                    </Draggable>
                                );
                              })}
                          {provided.placeholder}
                        </ul>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          </div>
      ))}
    </div>
  </div>;
}
