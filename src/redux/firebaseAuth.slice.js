import { createSlice } from "@reduxjs/toolkit";

export const firebaseAuthSlice = createSlice({
  name: "timeSelected",
  initialState: {
    userSignedIn: false,
    signInProgress: false,
    signInSuccess: false,
    signInFail: false,
    signInError: "",
    signUpProgress: false,
    signUpSuccess: false,
    signUpFail: false,
    signUpError: "",
    userUID: "test",
    userEmail: ""
  },

  reducers: {
    userSignedInAction: (state, action) => {
      state.userSignedIn = action.payload;
    },
    signInProgressAction: (state, action) => {
      state.signInProgress = action.payload;
    },
    signInSuccessAction: (state, action) => {
      state.signInSuccess = action.payload;
    },
    signInFailAction: (state, action) => {
      state.signInFail = action.payload;
    },
    signInErrorAction: (state, action) => {
      state.signInError = action.payload;
    },
    signUpProgressAction: (state, action) => {
      state.signUpProgress = action.payload;
    },
    signUpSuccessAction: (state, action) => {
      state.signUpSuccess = action.payload;
    },
    signUpFailAction: (state, action) => {
      state.signUpFail = action.payload;
    },
    signUpErrorAction: (state, action) => {
      state.signUpError = action.payload;
    },
    userUIDAction: (state, action) => {
      state.userUID = action.payload;
    },
    userEmailAction: (state, action) => {
      state.userEmail = action.payload;
    },
  },
});

export const {
  userSignedInAction,
  signInProgressAction,
  signInSuccessAction,
  signInFailAction,
  signInErrorAction,
  signUpProgressAction,
  signUpSuccessAction,
  signUpFailAction,
  signUpErrorAction,
  userUIDAction,
  userEmailAction
} = firebaseAuthSlice.actions;

export default firebaseAuthSlice.reducer;
