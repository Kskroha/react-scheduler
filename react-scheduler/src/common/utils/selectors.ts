import { RootState } from "../../app/store";

import { createSelector } from "reselect";

export const getEvents = (state: RootState) => state.schedule.events;
export const getActiveFilter = (state: RootState) =>
  state.schedule.activeFilter;

export const getFilteredEvents = createSelector(
  [getEvents, getActiveFilter],
  (events, activeFilter) => {
    if (activeFilter === "all") {
      return events;
    }

    return events.filter((event) => event.participants.some((participant) => participant.value === activeFilter));
  }
);
