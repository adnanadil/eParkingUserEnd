import React from "react";
import { MainParikingScreen } from "../../screens/mainParkingScreen/screen/mainParking.screen";
import { EachParkingScreen } from "../../screens/mainParkingScreen/screen/each.parking.screen";
import { Button } from "react-native-paper";

import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { View, Text } from "react-native";

/*
import {io} from "socket.io-client";
const socket = io.connect("http://socket-io-server-utb-tele-bot.herokuapp.com");
// const socket = io('http://socket-io-server-utb-tele-bot.herokuapp.com', {transports: ['websocket']});

const emitMessage = () => {
    socket.emit("send_message", { message: "F", room: "16" })
    console.log("Hello there")
}
*/

/*
For nested stack navigation/ multiple stack navigation
const IndividualParking = ({navigation}) => {
  return(
    <View>
      <Text 
        onPress={() => navigation.navigate("Parking")}
        // onPress={emitMessage}
      >This is where we check the parkings and make payment</Text>
    </View>
  );
}
*/

const ScreenAfterPayment = () => {
  return (
    <View>
      <Text>Payment pass or fail</Text>
    </View>
  );
};

const ParkingStack = createStackNavigator();

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
        name="Parking"
        component={MainParikingScreen}
      />
      {/* <ParkingStack.Screen name="Indivdual Parking" component={IndividualParking} /> */}
      <ParkingStack.Screen
        name="Indivdual Parking"
        component={EachParkingScreen}
        // options={{
        //   headerRight: () => (
        //     <Button
        //       onPress={() => console.log("This is a button!")}
        //       title="Hello there 2"
        //       color="#fff"
        //     />
        //   ),
        // }}
      />
      <ParkingStack.Screen
        name="After Payment"
        component={ScreenAfterPayment}
      />
    </ParkingStack.Navigator>
  );
};
