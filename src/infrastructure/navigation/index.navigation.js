// This is the main navigation we called this navigation in App.js that is as soon as the 
// app is opened we open this navigation and this is where we check if the user is logged in or not 
// if the user is logged in then we show the main page to the user if not we show the page where the 
// the user can choose to their login or register. 
// This is one of our constraints of the project which does not allow the user to use application until the 
// user is signed as this will increase the security of the application. 


// We import the needed libraries that we have installed using NPM and we also import the 
// project files from 11 to 23. 
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { TabNavigation } from "./tab.navigation";
import { LoginInNavigator } from "./login.navigator";

import { useDispatch, useSelector } from "react-redux";
import { signInErrorAction, signUpErrorAction, userEmailAction, userSignedInAction, userUIDAction } from "../../redux/firebaseAuth.slice";

import { app, auth } from "../../Utility/firebase.utils";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// This is the main function which is exported when the App.js calls the component.
export const RootNavigation = () => {

  // we are making use of redux dispatch function hence we are defining it here.
  const dispatch = useDispatch()

  // This is a very important part of the application we check using Firebase (since we are using 
  // firebase auth) to check the user is signed and if he/she is signed then we set the isAuthenticated
  // based on it as true or false. 
  // initially the value is set to be the default value as false which is saved in the slice of firebaseAuthSlice
  const isAuthenticated = useSelector((state) => state.firebaseAuthSlice.userSignedIn)
 


  // This runs as soon the component mounts that is as soon the apps and open and this is where we check if the user is signed in or not 
  // we make use of the firebase function onAuthStateChanged to check if the user is signed in or not 
  // if the user is signed in then we set the redux state value of userSignedIn to be true using the 
  // action userSignedInAction else by default it is set to false in the store... the value is set to also set to false 
  // when the user logs out as we are able to see in the logout logic. 

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
      }
    });
  }, []);

  // So now if the user is signed in we will take them to the main page which is under another 
  // navigation called the tab navigation that houses the bookings and account page (main app) or
  // we will take them to the LogInNavigation page which has the screen to allow the user to sign in
  // or register to the app. 
  
  return (
    <NavigationContainer>
      {isAuthenticated ? <TabNavigation /> : <LoginInNavigator />}
    </NavigationContainer>
  );
};
