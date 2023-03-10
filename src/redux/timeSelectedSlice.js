import { createSlice } from "@reduxjs/toolkit";
import { updateTheTimeSlot } from "./utility.functions/timeSlot.update.functions";
import { deleteTheTimeSlot } from "./utility.functions/timeSlot.update.functions";

export const timeSelectedSlice = createSlice({
  name: "timeSelected",
  initialState: {
    selectedTime: "Free",
    selectedTimeArray: [],
  },

  reducers: {
    timeSlotPicked: (state, action) => {
      state.selectedTime = action.payload;
    },
    timeSlotPickedArrayAction: (state, action) => {
      state.selectedTimeArray = updateTheTimeSlot(
        state.selectedTimeArray,
        action.payload
      );
    },
    resetTimeSlotArrayAction: (state, action) => {
      state.selectedTimeArray = []
    },
    deletTimeSlotAction: (state, action) => {
      state.selectedTimeArray = deleteTheTimeSlot(
        state.selectedTimeArray,
        action.payload
      );
    },
  },
});

export const {
  timeSlotPicked,
  timeSlotPickedArrayAction,
  deletTimeSlotAction,
  resetTimeSlotArrayAction,
} = timeSelectedSlice.actions;

export default timeSelectedSlice.reducer;
