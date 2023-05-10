// This screen is shown when any of the parking lots cards is pressed, it gets the details of the
// parking lot and based on that will display the parking lot card and below it the UI to allow the user to
// make a booking if we have a slot available.

// Since this is a very complex part of the app we have made of several components which make
// up the screen and have baked the logic into these components... to have an overview

// We have a card to show the details of the parking lot and below it we have the ParkingTimePickerBar to
// display the parking times slots to be chosen from this shows the time in hours from current time to the
// next 23 hours of time in hours once the user has selected a time slot they are then show the UI to pick the
// number of hours to make the booking for and after the user press the search button if we have parking slots
// based on the result from the data base we will allow the user to else they are shown the message that all slots are
// full and they need to choose another time slot

import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { SafeArea } from "../../../Utility/SafeArea";
import { ParkingInfoCard } from "../components/parking-info-card.component";
import { ParkingTimePickerBar } from "../components/parking-time-picker.bar";
import { ParkingHoursPicker } from "../components/parking-hours.picker";
import { ParkingCheckoutComponent } from "../components/parking-checkout";
import {
  LoadingAvailability,
  PaymentProcessing,
} from "../components/parking-checkout.styles";
import styled from "styled-components/native";

import {
  updateCurrentlySelectedParkingLot,
  updateParkingSlotsInChosenParkingLot,
  updateParkingSlotsuID,
  updateParkingCostPerHour,
  updateParkingSlotName,
} from "../../../redux/firestoreSlice";
import { Text } from "../../../components/typography/text.component";

export const EachParkingScreen = ({ route, navigation }) => {
  // Styled component to hold the button
  const ButtonHolder = styled.View`
    margin-left: 30;
    margin-top: 50;
  `;

  const dispatch = useDispatch();
  let showHoursPickerComponent = false;
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

  useEffect(() => {
    navigation.setOptions({
      title: parking.name,
    });
    dispatch(updateCurrentlySelectedParkingLot(parking));
    dispatch(updateParkingSlotsInChosenParkingLot(parking.parkingSlots));
    dispatch(updateParkingSlotsuID(parking.uID));
    dispatch(updateParkingCostPerHour(parking.costPerHour));
    dispatch(updateParkingSlotName(parking.name));
  }, []);

  return (
    <SafeArea>
      <ParkingInfoCard parking={parking} />
      <ScrollView>
        <ParkingTimePickerBar />
        {showHoursPickerComponent && <ParkingHoursPicker></ParkingHoursPicker>}
        {searchPressed && !searchComplete && (
          <LoadingAvailability></LoadingAvailability>
        )}
        {!searchPressed &&
          searchComplete &&
          (parkingsSlotsFull ? (
            <ButtonHolder>
              <Text variant="alert">Parking Full...</Text>
              <Text variant="alert">Please choose another time slot</Text>
            </ButtonHolder>
          ) : (
            <ParkingCheckoutComponent
              navigation={navigation}
            ></ParkingCheckoutComponent>
          ))}
        {
          //So basically we turn this loader on and then
          // we do your search if we have parking we will show checkout
          // or we will show other.
          // So this will be like isChecking for ability then show that loader
          // if not then we remove it.
          // Each component can be found under the components page they have their own logic
          // to get the times or the bookings and this simplifies the code of the page as we
          // are able to break the code into simpler portions
        }
      </ScrollView>
    </SafeArea>
  );
};
