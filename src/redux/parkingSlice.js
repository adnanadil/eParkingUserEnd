import { createSlice } from "@reduxjs/toolkit";
import {
  updateTheTimeSlot,
  updateTheTimeSlotDetails,
} from "./utility.functions/timeSlot.update.functions";
import { deleteTheTimeSlot } from "./utility.functions/timeSlot.update.functions";

export const parkingSlice = createSlice({
  name: "timeSelected",
  initialState: {
    selectedTime: "",
    selectedTimeArray: [],
    hoursSelected: 1,
    currentlyAvailableTimeSlotsDetails: [],
    searchCompleted: false,
    bookingInProgress: false,
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
      state.selectedTimeArray = [];
    },
    deletTimeSlotAction: (state, action) => {
      state.selectedTimeArray = deleteTheTimeSlot(
        state.selectedTimeArray,
        action.payload
      );
    },
    increseHours: (state, action) => {
      if (state.hoursSelected < 6) {
        state.hoursSelected = state.hoursSelected + 1;
      }
    },
    decreaseHours: (state, action) => {
      if (state.hoursSelected > 1) {
        state.hoursSelected = state.hoursSelected - 1;
      }
    },
    resetHours: (state, action) => {
      state.hoursSelected = 1;
    },
    pushTimeSlotDetails: (state, action) => {
      state.currentlyAvailableTimeSlotsDetails = updateTheTimeSlotDetails(
        state.currentlyAvailableTimeSlotsDetails,
        action.payload
      );
    },
    resetTimeSlotDetails: (state, action) => {
      state.currentlyAvailableTimeSlotsDetails = [];
    },
    updateSearchCompleted: (state, action) => {
      state.searchCompleted = action.payload;
    },
    updateBookingInProgress: (state, action) => {
      state.bookingInProgress = action.payload;
    },
  },
});

export const {
  timeSlotPicked,
  timeSlotPickedArrayAction,
  deletTimeSlotAction,
  resetTimeSlotArrayAction,
  increseHours,
  decreaseHours,
  pushTimeSlotDetails,
  resetTimeSlotDetails,
  updateSearchCompleted,
  updateBookingInProgress,
  resetHours
} = parkingSlice.actions;

export default parkingSlice.reducer;
