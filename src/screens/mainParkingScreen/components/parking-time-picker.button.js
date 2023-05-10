// These are each of the time slot buttons which can be pressed to select a 
// time slot make the booking at. 
// Instead of coding 23 button we have a simple component which can be called 23 times 
// using the map function (like the for loop) in the time picker component to show 23 
// button which can be chosen from 

// Once a button is pressed we set the time slot and also set the limit on the number hours 
// the user can make the bookings for to ensure it is the range which is inline with the 
// logic and working of the application

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  resetHours,
  timeSlotPicked,
  updateMaxBookingHoursPossible,
  updatePosition1TimeInt,
  updatePosition1TimeStamp,
  updateTimeSlotPosition1,
} from "../../../redux/parkingSlice";
import { SafeArea } from "../../../Utility/SafeArea";
import { Text } from "../../../components/typography/text.component";

import { TimeSlotButtonSelected } from "./parking-time-button.styled";
import { TimeSlotButtonUnselected } from "./parking-time-button.styled";


export const ParkingIndividualTime = ({
  timeSlot,
  timeStampInt,
  timeInInt,
  position,
}) => {
  
  const selectedTimeState = useSelector(
    (state) => state.parkingSlice.selectedTime
  );
  const bookingInProgress = useSelector(
    (state) => state.parkingSlice.bookingInProgress
  );
  const dispatch = useDispatch();
  var thisTheSelectedTime = false;
  if (selectedTimeState === timeSlot) {
    thisTheSelectedTime = true;
  }


  const buttonPressed = () => {
    dispatch(timeSlotPicked(timeSlot));
    dispatch(updateTimeSlotPosition1(position));
    dispatch(updatePosition1TimeStamp(timeStampInt));
    dispatch(updatePosition1TimeInt(timeInInt));

    // Check to make sure that we set limit to the number of booking to be done for
    var hoursLeftForBooking = 0
    for (i = position; i <= 23; i++) {
      hoursLeftForBooking = hoursLeftForBooking + 1
    }

    dispatch(updateMaxBookingHoursPossible(hoursLeftForBooking))
    dispatch(resetHours())

  };

  return (
    <SafeArea>
      {thisTheSelectedTime ? (
        <TimeSlotButtonSelected
          disabled={false}
        >
          <Text center variant="timeButtonText" numberOfLines={3}>
            {timeSlot}
          </Text>
        </TimeSlotButtonSelected>
      ) : (
        <TimeSlotButtonUnselected
          disabled={bookingInProgress}
          onPress={buttonPressed}
        >
          <Text center variant="timeButtonText" numberOfLines={3}>
            {timeSlot}
          </Text>
        </TimeSlotButtonUnselected>
      )}
    </SafeArea>
  );
};
