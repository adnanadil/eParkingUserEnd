import { createSlice } from "@reduxjs/toolkit";

export const timeSelectedSlice = createSlice({
  name: "timeSelected",
  initialState: {
    selectedTime: "Free",
  },

  reducers: {
    timeSlotPicked: (state, action) => {
      state.selectedTime = action.payload;
    },
  },
});

export const { timeSlotPicked } = timeSelectedSlice.actions;

export default timeSelectedSlice.reducer;
