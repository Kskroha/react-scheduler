import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TEvent } from "../../types/types";

export interface ScheduleState {
  events: TEvent[];
  createEventFailed: boolean;
  createEventSuccess: boolean;
  activeFilter: string;
}

const initialState: ScheduleState = {
  events: [],
  createEventFailed: false,
  createEventSuccess: false,
  activeFilter: "",
};

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    createEvent: (state, action: PayloadAction<TEvent>) => {
      if (
        state.events.some(
          (event) =>
            event.day === action.payload.day &&
            event.time === action.payload.time
        )
      ) {
        state.createEventFailed = true;
        return;
      }
      state.events.push(action.payload);
      state.createEventSuccess = true;
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
    },
    updateState: (state) => {
      state.createEventFailed = false;
      state.createEventSuccess = false;
    },
    setActiveFilter: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload;
    },
  },
});

export const getFilteredEvents = (events: TEvent[], activeFilter: string) => {
  if (events) {
    if (activeFilter === "all") {
      return events;
    }
    const filteredEvents = [];
  
    for (const event of events) {
      if (event.participants.includes(activeFilter)) filteredEvents.push(event);
    }
  
    return filteredEvents;
  }
};

export const { createEvent, deleteEvent, updateState, setActiveFilter } = scheduleSlice.actions;

export default scheduleSlice.reducer;
