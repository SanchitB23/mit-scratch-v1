import {createSelector} from "reselect";

const getRepeat = (state) => state.events.repeat
const getWait = (state) => state.events.wait
const getEvents = (state) => state.events
const x = (state) => state

export const getRepeatSelector = createSelector(getRepeat, x)
export const getWaitSelector = createSelector(getWait, x)
export const getEventsSelector = createSelector(getEvents, x)
