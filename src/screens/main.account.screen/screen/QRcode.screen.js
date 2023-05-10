// This is the page to generate and display the QR code, we generate the QR code using
// a library to which we just provide the value for the QR code must be generated in our case
// the booking ID and it will generate the QR code for us.

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";

import QRCode from "react-native-qrcode-svg";
import { Text } from "../../../components/typography/text.component";

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../Utility/firebase.utils";

// The main function of the component (screen) which we will be exporting and then use it in
// accounts navigations.
export const QRcodeScreen = ({ route, navigation }) => {
  const { booking } = route.params;

  const parkingLotID = booking.parkingLot;
  const parkingID = booking.parkingID;

  // Function we run when we press the delete booking option
  // We got to the selected parking lot's reservations and del the specific reservations.
  const delButtonPressed = () => {
    console.log(
      `Carry out the del operation in ${parkingLotID} of ${parkingID}`
    );
    delTheBooking();
  };

  const delTheBooking = async () => {
    await deleteDoc(doc(db, `reservations-${parkingLotID}`, parkingID));
    navigation.navigate("Your Account");
  };

  // Simple screen which shows the QR code generated from the library with the booking ID and then 
  // a delete button which is text wrapped in TouchableOpacity to delete the booking if needed 
  return (
    <View style={styles.container}>
      <QRCode value={parkingID} size={250} />
      <StatusBar style="auto" />
      <TouchableOpacity onPress={delButtonPressed} style={styles.button}>
        <Text variant="del">Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

// Making use of StyleSheet rather than styled components as this was easier to use in the screen 
// as we did not have to reuse the components anywhere. 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 200,
  },
});
