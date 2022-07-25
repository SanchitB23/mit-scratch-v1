import React, {useCallback} from "react";
import Sidebar from "./views/sidebar";
import MidArea from "./views/mid-area";
import Preview from "./views/Preview";
import {DragDropContext} from "react-beautiful-dnd";
import {getListSelector} from "./redux/selectors";
import {useSelector} from "react-redux";

export default function App() {
  const {midAreaLists} = useSelector(getListSelector)

  //todo
  const onDragEnd = useCallback((result) => {
    console.log("onDrag", result)
    let element = result.draggableId.split("-")[0];

    const old_list = midAreaLists;
    let source_index = old_list.findIndex(
        (x) => x.id === result.source.droppableId
    );
    if (source_index > -1) {
      let comp_list = old_list[source_index].comps;
      comp_list.splice(result.source.index, 1);
      old_list[source_index].comps = comp_list;
    }

    let dest_index = old_list.findIndex(
        (x) => x.id === result.destination.droppableId
    );

    if (dest_index > -1) {
      let dest_comp_list = old_list[dest_index].comps;
      dest_comp_list.splice(result.destination.index, 0, `${element}`);

      old_list[dest_index].comps = dest_comp_list;
    }
  }, [])

  return (
      <div className="bg-blue-100 pt-6 font-sans">
        <div className="flex md:flex-row flex-col w-full md:overflow-hidden md:h-screen">
          <DragDropContext onDragEnd={onDragEnd}>
            <div
                className="md:flex-1 md:overflow-auto flex flex-col md:flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl rounded-tl-xl md:rounded-tr-0 md:mr-2">
              <Sidebar/> <MidArea/>
            </div>
          </DragDropContext>
          <div
              className="md:w-1/3 sm:w-full h-screen relative md:overflow-scroll flex flex-row bg-white border-t md:border-l border-gray-200 rounded-tl-xl md:ml-2 mt-2 md:mt-0 rounded-tr-xl md:rounded-tr-0">
            <Preview/>
          </div>
        </div>
      </div>
  );
}
