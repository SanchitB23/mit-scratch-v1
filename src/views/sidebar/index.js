import React, {useRef} from "react";
import Icon from "../../components/Icon";
import {Draggable, Droppable} from "react-beautiful-dnd";
import ViewTitle from "../../components/common/view-title";
import CodeTypeTitle from "./code-type-title";
import {controlComponents, eventsComponents, looksComponents, motionComponents} from "../../constants";
import DragDrop from "./drag-drop";

export default function Sidebar() {
  const dragItem = useRef()

  function dragStart(event, position) {
    dragItem.current = position
    console.log("Testtt", event.target.innerHTML)
  }

  return (
      <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
        <ViewTitle>Side Bar</ViewTitle>
        {/*Events*/}
        <DragDrop name={"events"} type={eventsComponents}/>
        {/*<div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">*/}
        {/*  {"When "}*/}
        {/*  <Icon name="flag" size={15} className="text-green-600 mx-2"/>*/}
        {/*  {"clicked"}*/}
        {/*</div>*/}
        {/*<div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">*/}
        {/*  {"When this sprite clicked"}*/}
        {/*</div>*/}
        {/*<div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">*/}
        {/*  {"When this {Some Key} key pressed"}*/}
        {/*</div>*/}
        {/*Motion*/}
        <DragDrop name={"motion"} type={motionComponents}/>
        {/*Looks*/}
        <DragDrop name={"looks"} type={looksComponents}/>
        {/*Control*/}
        <DragDrop name={"controls"} type={controlComponents}/>
      </div>
  );
}
