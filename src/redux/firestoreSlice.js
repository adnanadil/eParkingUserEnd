// One of the slice with the actions and state that we will use in the redux store and 
// hence throughout the app we can access these states and update them as needed.
// Detailed information and support from the redux docs: https://redux.js.org/tutorials/quick-start

import { createSlice } from "@reduxjs/toolkit";

export const firestoreSlice = createSlice({
  name: "firestoreSlice",
  initialState: {
    parkingLots: [],
    parkingLotsLoading: true,
    currentlySelectedParkingLot: [],
    parkingSlotsInChosenParkingLot: [],
    parkingSlotsuID: "",
    parkingSlotName: "",
    costPerHour: 1
  },

  reducers: {
    updateParkingLots: (state, action) => {
      state.parkingLots =  action.payload;
    },
    updateParkingLotsLoading: (state, action) => {
      state.parkingLotsLoading = action.payload;
    },
    updateCurrentlySelectedParkingLot: (state, action) => {
        state.currentlySelectedParkingLot = action.payload;
    },
    clearCurrentlySelectedParkingLot: (state, action) => {
        state.currentlySelectedParkingLot = [];
    },
    updateParkingSlotsInChosenParkingLot: (state, action) => {
        state.parkingSlotsInChosenParkingLot = action.payload;
    },
    updateParkingSlotsuID: (state, action) => {
        state.parkingSlotsuID = action.payload;
    },
    updateParkingSlotName: (state, action) => {
        state.parkingSlotName = action.payload;
    },
    updateParkingCostPerHour: (state, action) => {
      state.costPerHour = action.payload;
    },
  },
});

export const {
    updateParkingLots,
    updateParkingLotsLoading,
    updateCurrentlySelectedParkingLot,
    clearCurrentlySelectedParkingLot,
    updateParkingSlotsInChosenParkingLot,
    updateParkingSlotsuID,
    updateParkingCostPerHour,
    updateParkingSlotName
} = firestoreSlice.actions;

export default firestoreSlice.reducer;
