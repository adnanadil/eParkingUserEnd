// This more like that main page of the application, it is the first page which is shown by the 
// mainParkings stack navigation under the tab Navigation 

// In a nutshell this screen gets all the parking lots and their details and displays it in a card 
// view and these cards are placed in a list view to have the ability to scroll through the various 
// parking lots.
// Once a card is clicked a new page called the EachParkingScreen is opened and it allows the user to 
// making a booking for the selected parking lot. 

import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { SafeArea } from "../../../Utility/SafeArea";
import { Spacer } from "../../../components/spacer/spacer.component";
import { FadeInView } from "../../../components/animations/fade.animation";

import { ParkingList } from "../components/parking-list.styles";
import { ParkingInfoCard } from "../components/parking-info-card.component";

import { PaymentProcessing } from "../components/parking-checkout.styles";

import { db } from "../../../Utility/firebase.utils";
import { collection, query, where, getDocs } from "firebase/firestore";

import { useSelector, useDispatch } from "react-redux";
import {
  resetHours,
  timeSlotPicked,
  updateBookingInProgress,
  updateGeneratedAllParkingSlots,
  updateSearchCompleted,
  updateSearchPressed,
} from "../../../redux/parkingSlice";

import { useIsFocused } from "@react-navigation/native";
import { clearCurrentlySelectedParkingLot, updateParkingLots, updateParkingLotsLoading, updateParkingSlotsInChosenParkingLot } from "../../../redux/firestoreSlice";


export const MainParikingScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const [parkingLotsArrayOfObjects, updateParkingLotsArrayOfObbjects] = useState([])
  const parkingLotsLoading = useSelector((state) => state.firestoreSlice.parkingLotsLoading)
  const parkingLots = useSelector((state) => state.firestoreSlice.parkingLots)

  // We use this function to get all the parking lots
  const getParkingLots = async () => {
    const q = query(collection(db, "parkingLots"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      updateParkingLotsArrayOfObbjects(parkingLotsArrayOfObjects.push(doc.data()))
    });
    dispatch(updateParkingLotsLoading(false))
    dispatch(updateParkingLots(parkingLotsArrayOfObjects))
  };

  // Called with component (screen) mounts
  useEffect(() => {
    getParkingLots()
  }, []);



  // We use this in order to reset the time slot if the user moves back to this screen 
  // from the screen which allows them to make the booking, basically we are resetting 
  // the redux state values so that it does not use the old state values... 
  const isFocused = useIsFocused();
  useEffect(() => {
    dispatch(timeSlotPicked(""));
    dispatch(updateSearchPressed(false));
    dispatch(updateSearchCompleted(false));
    dispatch(updateBookingInProgress(false));
    dispatch(resetHours());
    dispatch(updateGeneratedAllParkingSlots(false))
    dispatch(clearCurrentlySelectedParkingLot());
  }, [isFocused]);

 

  // Here wer render the different elements of the page .. if the parking lots are still being 
  // downloaded from the sever we show the spinner else we show the ParkingList styled component of type list
  // In the list view we render each card, add a touch functionality to move to the booking page and also add 
  // an animation to beautify the app
  return (
    <SafeArea>
      {parkingLotsLoading ? <PaymentProcessing></PaymentProcessing>
      :
      <ParkingList
        data={parkingLots}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Indivdual Parking", {
                  parking: item,
                })
              }
            >
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <ParkingInfoCard parking={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />}
    </SafeArea>
  );
};
