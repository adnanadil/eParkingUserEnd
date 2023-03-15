import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { StatusBar } from 'expo-status-bar';


import QRCode from "react-native-qrcode-svg";
import { Text } from "../../../components/typography/text.component";

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../Utility/firebase.utils";

import { useSelector } from "react-redux";

export const QRcodeScreen = ({ route, navigation }) => {
  const { booking } = route.params;

//   const parkingLotID = booking.parkingLot
//   const parkingID = booking.parkingID
const parkingLotID = "gLqJBzLLQe4QSYC3o4Eo"
const parkingID = "179f5a77-77dd-4436-aef3-1562f13e047c"
  

  const delButtonPressed = () => {
    //   console.log(`Carry out the del operation in ${parkingLotID} of ${parkingUID}`)
      delTheBooking()
  }

  const delTheBooking = async () => {
    await deleteDoc(doc(db, `reservations-${parkingLotID}`, parkingID));
    navigation.navigate("Your Account")
  }

  return (
    <View style={styles.container}>
      {/* <QRCode value="https://facebook.com" /> */}
      <QRCode 
        value={parkingID} 
        size={250}
      />
      <StatusBar style="auto" />
      <TouchableOpacity 
        onPress={delButtonPressed}
        style={styles.button}
        >

        <Text variant="del">Delete</Text> 
      </TouchableOpacity>
    </View>
  );
};



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
    }
  });
