import { configureStore } from "@reduxjs/toolkit";
// import with a name you want.
import parkingReducer from "./parkingSlice";
import firebaseAuthReducer from "./firebaseAuth.slice";

export default configureStore({
  reducer: {
    parkingSlice: parkingReducer,
    firebaseAuthSlice: firebaseAuthReducer
  },
});
