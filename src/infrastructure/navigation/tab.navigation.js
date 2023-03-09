import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainParikingScreen } from "../../screens/mainParkingScreen/screen/mainParking.screen";
import { MainParkingNavigator } from "./mainParkings.navigation";
import { AccountNavigator } from "./account.navigation";


import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Parking: "md-car",
  Account: "md-person",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    headerShown:false,
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

export const TabNavigation = () => {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};
