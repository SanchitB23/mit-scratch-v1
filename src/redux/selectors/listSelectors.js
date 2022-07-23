import {createSelector} from "reselect";

const getLists = (state) => state.lists
const x = (state) => state

export const getListSelector = createSelector(getLists, x)
