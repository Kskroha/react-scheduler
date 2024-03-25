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
  activeFilter: "all",
};

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    createEvent: (state, action: PayloadAction<TEvent>) => {
      if (
        state.events.some(
          (event) =>
            event.day.value === action.payload.day.value &&
            event.time.value === action.payload.time.value
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
    }
  },
});

export const { createEvent, deleteEvent, updateState, setActiveFilter } = scheduleSlice.actions;

export default scheduleSlice.reducer;
