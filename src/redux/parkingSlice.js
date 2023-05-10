// One of the slice with the actions and state that we will use in the redux store and 
// hence throughout the app we can access these states and update them as needed.
// Got the structure from Redux documentation: https://redux.js.org/tutorials/quick-start


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
    parkingsSlotsFull: false,
    timeSlotPosition1: 0,
    position1TimeStamp: 0,
    position1TimeInt: 0,
    timeSlotPosition2: 0,
    position2TimeStamp: 0,
    position2TimeInt: 0,
    maxBookingHoursPossible: 1,
    timeSlotToBook: ""
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
    updateTimeSlotPickedArray: (state, action) => {
      state.selectedTimeArray = action.payload
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
      if (state.hoursSelected < action.payload) {
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
      // var newValueToUpdate = updateTheTimeSlotDetails(
      //   state.currentlyAvailableTimeSlotsDetails,
      //   action.payload
      // );
      // state.currentlyAvailableTimeSlotsDetails = newValueToUpdate
      // state.currentlyAvailableTimeSlotsDetails = ["Show this brother", "and this"]
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
    updateParkingsSlotsFull: (state, action) => {
      state.parkingsSlotsFull = action.payload;
    },
    updateBookingInProgress: (state, action) => {
      state.bookingInProgress = action.payload;
    },
    updateTimeSlotPosition1: (state, action) => {
      state.timeSlotPosition1 = action.payload;
    },
    updatePosition1TimeStamp: (state, action) => {
      state.position1TimeStamp = action.payload;
    },
    updatePosition1TimeInt: (state, action) => {
      state.position1TimeInt = action.payload;
    },
    updateTimeSlotPosition2: (state, action) => {
      state.timeSlotPosition2 = action.payload;
    },
    updatePosition2TimeStamp: (state, action) => {
      state.position2TimeStamp = action.payload;
    },
    updatePosition2TimeInt: (state, action) => {
      state.position2TimeInt = action.payload;
    },
    updateMaxBookingHoursPossible: (state, action) => {
      state.maxBookingHoursPossible = action.payload;
    },
    updateTimeSlotToBook: (state, action) => {
      state.timeSlotToBook = action.payload;
    },
  },
});

export const {
  timeSlotPicked,
  timeSlotPickedArrayAction,
  updateTimeSlotPickedArray,
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
  updateParkingsSlotsFull,
  resetHours,
  updateTimeSlotPosition1,
  updatePosition1TimeStamp,
  updatePosition1TimeInt,
  updateTimeSlotPosition2,
  updatePosition2TimeStamp,
  updatePosition2TimeInt,
  updateMaxBookingHoursPossible,
  updateTimeSlotToBook,
} = parkingSlice.actions;

export default parkingSlice.reducer;
