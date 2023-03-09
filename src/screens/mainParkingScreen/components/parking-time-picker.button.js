import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { timeSlotPicked } from "../../../redux/timeSelectedSlice";
import { SafeArea } from "../../../Utility/SafeArea";
import { Text } from "../../../components/typography/text.component";

import { TimeSlotButtonSelected } from "./parking-time-button";
import { TimeSlotButtonUnselected } from "./parking-time-button";

export const ParkingIndividualTime = ({ timeSlot: timeSlot }) => {
  const selectedTimeState = useSelector(
    (state) => state.timeSelectedSlice.selectedTime
  );
  const dispatch = useDispatch();
//   console.log(`This is the time selected from Work ${selectedTimeState}`);
  var thisTheSelectedTime = false;
  if (selectedTimeState === timeSlot) {
    thisTheSelectedTime = true;
  }
  return (
    <SafeArea>
      {thisTheSelectedTime ? (
        <TimeSlotButtonSelected
          disabled={false}
          onPress={() => dispatch(timeSlotPicked(timeSlot))}
        >
          <Text center variant="timeButtonText" numberOfLines={3}>
            {timeSlot}
          </Text>
        </TimeSlotButtonSelected>
      ) : (
        <TimeSlotButtonUnselected
          disabled={false}
          onPress={() => dispatch(timeSlotPicked(timeSlot))}
        >
          <Text center variant="timeButtonText" numberOfLines={3}>
            {timeSlot}
          </Text>
        </TimeSlotButtonUnselected>
      )}
    </SafeArea>
  );
};
