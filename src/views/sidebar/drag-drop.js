import React, {Fragment} from 'react';
import CodeTypeTitle from "./code-type-title";
import {Draggable, Droppable} from "react-beautiful-dnd";
import getComponent from "../../helpers/getComponents";

const DragDrop = ({type, name}) => {
  if (!type.length) return <div/>
  return (
      <Fragment>
        <CodeTypeTitle>{name}</CodeTypeTitle>
        <Droppable droppableId={`sideArea-${name}`} type="COMPONENTS">
          {
            (provided) => (
                <ul
                    className={`sideArea-${name} my-3`}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                  {type.map((str, i) => (
                      <Draggable
                          key={`${str}-sideArea`}
                          draggableId={`${str}-sideArea`}
                          index={i}
                      >
                        {(provided) => (
                            <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="my-2"
                            >
                              {getComponent(str)}
                            </li>
                        )}
                      </Draggable>))}
                  {provided.placeholder}
                </ul>
            )
          }
        </Droppable>
      </Fragment>
  );
};

export default DragDrop;
