import { app } from "./firebase.utils";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { useDispatch } from "react-redux";
import {
  userSignedInAction,
  signInProgressAction,
  signInSuccessAction,
  signInFailAction,
  signInErrorAction,
  signUpProgressAction,
  signUpSuccessAction,
  signUpFailAction,
  signUpErrorAction,
  userUISAction,
} from "../redux/firebaseAuth.slice";

const auth = getAuth(app);

// const dispatch = useDispatch();

export const checkUserStatus = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      //   dispatch();
      return true;
      // ...
    } else {
      // User is signed out
      // ...
      console.log("NO user !!! (Function)");
      return false;
    }
  });
};

export const signInUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Sign in succeess");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const signInUpUser = (userName, email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

export const signOutUser = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("Sign Out succeess");
    })
    .catch((error) => {
      // An error happened.
    });
};
