import {combineReducers} from "redux";
import characterReducers from "./characterReducers";
import {eventReducer} from "./eventReducers";
import {listReducer} from "./listReducers";

const rootReducer = combineReducers({
  character: characterReducers,
  events: eventReducer,
  lists: listReducer
})
export default rootReducer
