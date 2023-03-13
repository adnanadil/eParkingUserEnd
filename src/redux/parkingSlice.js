import { createSlice } from "@reduxjs/toolkit";
import {
  updateTheTimeSlot,
  updateTheTimeSlotDetails,
} from "./utility.functions/parkingSlice.update.functions";
import { deleteTheTimeSlot } from "./utility.functions/parkingSlice.update.functions";

export const parkingSlice = createSlice({
  name: "parkingSlice",
  initialState: {
    selectedTime: "",
    selectedTimeArray: [],
    hoursSelected: 1,
    currentlyAvailableTimeSlotsDetails: [],
    generatedAllParkingSlots: false,
    searchPressed: false,
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
      // state.currentlyAvailableTimeSlotsDetails = ["Show this brother"]
    },
    updateGeneratedAllParkingSlots: (state, action) => {
      state.generatedAllParkingSlots = action.payload;
    },
    resetTimeSlotDetails: (state, action) => {
      state.currentlyAvailableTimeSlotsDetails = [];
    },
    updateSearchPressed: (state, action) => {
      state.searchPressed = action.payload;
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
  updateGeneratedAllParkingSlots,
  resetTimeSlotDetails,
  updateSearchPressed,
  updateSearchCompleted,
  updateBookingInProgress,
  resetHours
} = parkingSlice.actions;

export default parkingSlice.reducer;
