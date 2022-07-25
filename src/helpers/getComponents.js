import React from "react";
import {GoTo, Move, Turn} from "../components/motion";
import DisplayMessage from "../components/looks/DisplayMessage";
import Hide from "../components/looks/Hide";
import Size from "../components/looks/Size";
import {WaitRepeat} from "../components/control";

const getComponent = (key, id) => {
  switch (key) {
    case "MOVE":
      return <Move comp_id={id} isMoveX={true}/>
    case "TURN_CLOCKWISE":
      return <Turn isClockwise={true} comp_id={id}/>
    case "TURN_ANTI_CLOCKWISE":
      return <Turn isClockwise={false} comp_id={id}/>
    case "GOTO_XY":
      return <GoTo comp_id={id} isX isY/>
    case "GOTO_X":
      return <GoTo comp_id={id} isX/>
    case "GOTO_Y":
      return <GoTo comp_id={id} isY/>
    case "SAY_MESSAGE":
      return <DisplayMessage comp_id={id}/>
    case "SAY_MESSAGE_WITH_TIMER":
      return <DisplayMessage comp_id={id} hasTimer/>
    case "THINK":
      return <DisplayMessage comp_id={id} isThinking/>
    case "THINK_TIMER":
      return <DisplayMessage comp_id={id} isThinking hasTimer/>
    case "HIDE_MESSAGE":
      return <Hide comp_id={id}/>
    case "HIDE":
      return <Hide comp_id={id} shouldHideCharacter/>
    case "SHOW":
      return <Hide comp_id={id} shouldShowCharacter/>
    case "SIZE":
      return <Size comp_id={id}/>
    case "WAIT":
      return <WaitRepeat comp_id={id} isWait/>
    case "REPEAT":
      return <WaitRepeat comp_id={id}/>
    default:
      return key;
  }
}
export default getComponent
