import { createSlice } from "@reduxjs/toolkit";

export const firestoreSlice = createSlice({
  name: "firestoreSlice",
  initialState: {
    parkingLots: [],
    parkingLotsLoading: true,
    currentlySelectedParkingLot: [],
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
  },
});

export const {
    updateParkingLots,
    updateParkingLotsLoading,
    updateCurrentlySelectedParkingLot,
    clearCurrentlySelectedParkingLot
} = firestoreSlice.actions;

export default firestoreSlice.reducer;
