import {SET_LIST, ADD_LIST} from "../../constants/action-types";

export const updateList = (id, new_list) => {
  return {
    type: SET_LIST,
    list: new_list,
    id: id,
  };
};

export const addList = () => {
  console.log("test")
  return {
    type: ADD_LIST,
  };
};
