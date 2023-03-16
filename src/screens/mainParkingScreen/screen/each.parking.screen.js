import React, { useEffect, useState } from "react";
import { View, Button } from "react-native";
import { ScrollView } from "react-native";


import { useSelector, useDispatch } from "react-redux";
import { pushTimeSlotDetails } from "../../../redux/parkingSlice";
import { SafeArea } from "../../../Utility/SafeArea";
import { ParkingInfoCard } from "../components/parking-info-card.component";
import { ParkingTimePickerBar } from "../components/parking-time-picker.bar";
import { ParkingHoursPicker } from "../components/parking-hours.picker";
import { ParkingCheckoutComponent } from "../components/parking-checkout";
import { LoadingAvailability, PaymentProcessing } from "../components/parking-checkout.styles";
import moment from "moment/moment";
import styled from "styled-components/native";


import { 
  updateCurrentlySelectedParkingLot, 
  updateParkingSlotsInChosenParkingLot,
  updateParkingSlotsuID, 
  updateParkingCostPerHour,
  updateParkingSlotName
} from "../../../redux/firestoreSlice";
import { Text } from "../../../components/typography/text.component";

export const EachParkingScreen = ({ route, navigation }) => {

  const ButtonHolder = styled.View`
    margin-left: 30;
    margin-top: 50;
  `

  const dispatch = useDispatch();
  let showHoursPickerComponent = false;
  // const selectedTimeSlotArrayFromState = useSelector(
  //   (state) => state.parkingSlice.selectedTimeArray
  // );
  // if (Object.keys(selectedTimeSlotArrayFromState).length !== 0) {
  //   showCheckOutComponent = true;
  //   console.log("We can show check out");
  // }
  const selecteTimeSlot = useSelector(
    (state) => state.parkingSlice.selectedTime
  );
  const searchComplete = useSelector(
    (state) => state.parkingSlice.searchCompleted
  );
  const searchPressed = useSelector(
    (state) => state.parkingSlice.searchPressed
  );
  const parkingsSlotsFull = useSelector(
    (state) => state.parkingSlice.parkingsSlotsFull
  );
  if (selecteTimeSlot !== "") {
    showHoursPickerComponent = true;
  }
  const { parking } = route.params;

  const convertTime = timeStr => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes,seconds] = time.split(':');
    if (hours === '12') {
       hours = '00';
    }
    if (modifier === 'PM') {
       hours = parseInt(hours, 10) + 12;
    }
    return `${hours}`;
 };

  useEffect(() => {
    navigation.setOptions({
      title: parking.name,
    });
    dispatch(updateCurrentlySelectedParkingLot(parking))
    dispatch(updateParkingSlotsInChosenParkingLot(parking.parkingSlots))
    dispatch(updateParkingSlotsuID(parking.uID))
    dispatch(updateParkingCostPerHour(parking.costPerHour))
    dispatch(updateParkingSlotName(parking.name))
    // console.log(parking.parkingSlots)
  }, []);

  // const parkingTimeSlots = ["3PM", "4PM", "5PM", "6PM", "7PM"];
  return (
    <SafeArea>
      <ParkingInfoCard parking={parking} />
      <ScrollView>
      <ParkingTimePickerBar/>
      {showHoursPickerComponent && <ParkingHoursPicker></ParkingHoursPicker>}
      {/* {showCheckOutComponent && <LoadingAvailability></LoadingAvailability>} */}
      { (searchPressed && !searchComplete) &&   
        <LoadingAvailability></LoadingAvailability>  
      }
      {
        (!searchPressed && searchComplete) && 
        (
          parkingsSlotsFull ? 
          <ButtonHolder>
            <Text variant="alert">Parking Full...</Text> 
            <Text variant="alert">Please choose another time slot</Text> 
          </ButtonHolder>
          : 
          <ParkingCheckoutComponent navigation= {navigation}></ParkingCheckoutComponent>
        )

      }
      {
        //So basically we turn this loader on and then
        // we do your search if we have parking we will show checkout
        // or we will show other.
        // So this will be like isChecking for ability then show that loader
        // if not then we remove it.
      }
      {/* <Text>Hello there ${Object.keys(selectedTimeSlotArrayFromState).length}</Text> */}
      </ScrollView>
    </SafeArea>
  );
};
