import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { TabNavigation } from "./tab.navigation";
import { LoginInNavigator } from "./login.navigator";

import { useDispatch, useSelector } from "react-redux";
import { signInErrorAction, signUpErrorAction, userEmailAction, userSignedInAction, userUIDAction } from "../../redux/firebaseAuth.slice";

import { app, auth } from "../../Utility/firebase.utils";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { checkUserStatus } from "../../Utility/firebase.auth.utils";

export const RootNavigation = () => {

  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.firebaseAuthSlice.userSignedIn)

  console.log(`He there ${checkUserStatus()}`);

  useEffect(() => {
    dispatch(signInErrorAction(""));
    dispatch(signUpErrorAction(""));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        dispatch(userSignedInAction(true));
        dispatch(userUIDAction(user.uid));
        dispatch(userEmailAction(user.email));
      } else {
        // User is signed out
        // console.log("NO user !!! (Function)");
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? <TabNavigation /> : <LoginInNavigator />}
    </NavigationContainer>
  );
};
