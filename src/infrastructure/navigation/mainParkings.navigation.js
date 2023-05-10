// This is the Stack Navigation of the main parking lots this will help us show all the parking lots
// and it will also allow us to have the feature of moving into a new page that will alow us to book
// a parking spot. So we create the MainParikingScreen and the EachParkingScreen which are imported and
// used here. depending on the interaction of the user we will show the right screen (page).

import React from "react";
import { MainParikingScreen } from "../../screens/mainParkingScreen/screen/mainParking.screen";
import { EachParkingScreen } from "../../screens/mainParkingScreen/screen/each.parking.screen";

import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

// Creating a stack navigation variable we learned about this from react navigation docs
const ParkingStack = createStackNavigator();

// The main function of the stack navigation; we set a few settings in terms of the way we will
// display the pages and then we will add the needed screes we need two screen the screen to show all the
// parking lots and the other is the screen which will allow us to book so we define the name of the screen
// and then import the needed screens.
// Using this we are now able to dine the first page which will be shown the tab navigation 
export const MainParkingNavigator = ({ route, navigation }) => {
  return (
    <ParkingStack.Navigator
      headerMode="screen"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <ParkingStack.Screen
        options={{
          header: () => null,
        }}
        name="Parkings"
        component={MainParikingScreen}
      />
      <ParkingStack.Screen
        name="Indivdual Parking"
        component={EachParkingScreen}
      />
    </ParkingStack.Navigator>
  );
};
