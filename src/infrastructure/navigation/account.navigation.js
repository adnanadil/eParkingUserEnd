// This is the second tab which will be show by main tab bar of the app. It is the accounts tab which 
// will have the screen to show the user details, allow the user to sign out and the next page to show 
// the bookings to user and the show a page with the generated QR code. 

// Carrying out the imports and we are also importing the screens
import React from "react";
import { MainAccountsScreen } from "../../screens/main.account.screen/screen/main.account.screen";
import { YourParkingScreen } from "../../screens/main.account.screen/screen/your.parking.screen";
import { QRcodeScreen } from "../../screens/main.account.screen/screen/QRcode.screen";

import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

// Creating a new stack navigation variable to create a stack navigation which will contain all the pages needed. 
const AccountStack = createStackNavigator();

// Setting up and export the stack nav component to be used by the tab navigation of the app. 
export const AccountNavigator = ({ route, navigation }) => {
  return (
    <AccountStack.Navigator
      headerMode="screen"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <AccountStack.Screen
        options={{
          header: () => null,
        }}
        name="Your Account"
        component={MainAccountsScreen}
      />
      <AccountStack.Screen name="Your Parkings" component={YourParkingScreen} />
      <AccountStack.Screen name="QR Code" component={QRcodeScreen} />
    </AccountStack.Navigator>
  );
};
