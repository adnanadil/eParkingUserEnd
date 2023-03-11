import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { TabNavigation } from "./tab.navigation";
import { AccountNavigator } from "./account.navigator";

import { AuthenticationContext } from "../../services/authentication/authentication.context";

import {app} from "../../Utility/firebase.utils"
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const RootNavigation = () => {
  const isAuthenticated = false;

const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
    if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log("We have a user");
    isAuthenticated = true
    // ...
    } else {
    // User is signed out
    // ...
    console.log("NO user !!!");
    isAuthenticated = false
    }
});
  

  return (
    <NavigationContainer>
      {isAuthenticated ? <TabNavigation /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
