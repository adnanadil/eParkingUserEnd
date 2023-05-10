// The main redux store of the app with all the reducers imported and added to this 
// this is what we wrap across the main app in the App.js file using the provider 
// Learned to use and implement it from the Redux documentation: https://redux.js.org/tutorials/quick-start

import { configureStore } from "@reduxjs/toolkit";
// import with a name you want.
import parkingReducer from "./parkingSlice";
import firebaseAuthReducer from "./firebaseAuth.slice";
import firestoreSliceReduer from "./firestoreSlice"

export default configureStore({
  reducer: {
    parkingSlice: parkingReducer,
    firebaseAuthSlice: firebaseAuthReducer,
    firestoreSlice: firestoreSliceReduer
  },
});
