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
