// This navigation component which is of the form tab navigation contains the two main pages
// of the application which are the parkings page showing all the parking lots and then the account page
// that helps us to logout and look at all our bookings each of these pages are in the form of stack navigation
// which help in the stacking multiple screens (pages) together.

// Importing the the libraries, the functions of the libraries and the needed files and the functions
// for the local file directory.
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainParkingNavigator } from "./mainParkings.navigation";
import { AccountNavigator } from "./account.navigation";

import { Ionicons } from "@expo/vector-icons";

// We are declaring a bottom tab navigation that will act the main for of navigation in our app
// we will have two tabs one will be tab to hold the parkings lots its stack to make a booking for each parking lot
// the other tab is to look into the bookings, get the QR code and we will also add the sign out function here.

const Tab = createBottomTabNavigator();

// We will define the two types of icons that we will use
const TAB_ICON = {
  Parking: "md-car",
  Account: "md-person",
};

// The options for the screen that will be under the two tabs
const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    headerShown: false,
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

// Here we will return the TabNavigation which will be shown if the user is signed in
// We set basic settings from line 46 to 51 and then we are setting the two main pages
// again we need pages under pages so we need stack navigation and hence the parking navigation
// and the account navigation are two different navigation view under which we will define our screens
// for each respective stack and location of the app.

export const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={createScreenOptions}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Parking" component={MainParkingNavigator} />
      <Tab.Screen name="Account" component={AccountNavigator} />
    </Tab.Navigator>
  );
};
