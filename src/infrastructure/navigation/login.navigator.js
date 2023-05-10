// If the user is not signed in or has signed out of the app the mainParkings.Navigation.js 
// will show this component which is a type of Stack navigation. we could show a single page BUT
// since we want to have both login and register pages (or screens) we need to have a navigation 
// this is a stack navigation which will have pages that can be navigated.  

// Importing the functions from the libraries and the screens
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { LoginOrRegisterScreen } from "../../screens/account/screens/loginOrRegister.screen";
import { LoginScreen } from "../../screens/account/screens/login.screen";
import { RegisterScreen } from "../../screens/account/screens/register.screen";

// Creating a stack navigation variable, we learned how to use this by following the documentation 
// of react navigation. 
const Stack = createStackNavigator();

// This function is exported and when it called by the mainParkings.Navigation.js if the user is not signed in
// we then show the page that has the option to sign in or register. 
// Each of the pages are separate components which are help by this stack navigation.
// So we design the three pages and then import them here to be used. 
export const LoginInNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Main" component={LoginOrRegisterScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);
