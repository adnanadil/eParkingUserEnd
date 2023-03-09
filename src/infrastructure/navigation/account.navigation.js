import React from "react";
import { MainAccountsScreen } from "../../screens/main.account.screen/screen/main.account.screen";
import { YourParkingScreen } from "../../screens/main.account.screen/screen/your.parking.screen";

import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { View, Text } from "react-native";


const YourParkings = () => {
  return(
    <View>
      <Text>You can see all your parkings here</Text>
    </View>
  );
}


const CameraScreen = () => {
  return(
    <View>
      <Text>Hello This is Camera Screen</Text>
    </View>
  );
}


const AccountStack = createStackNavigator();

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
        name="Account"
        component={MainAccountsScreen}
      />
      <AccountStack.Screen name="Your Parkings" component={YourParkingScreen} />
      <AccountStack.Screen name="QR Code" component={CameraScreen} />
    </AccountStack.Navigator>
  );
};
