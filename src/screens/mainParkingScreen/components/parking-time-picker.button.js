import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { timeSlotPicked } from "../../../redux/timeSelectedSlice";
import { timeSlotPickedArrayAction } from "../../../redux/timeSelectedSlice";
import { deletTimeSlotAction } from "../../../redux/timeSelectedSlice";
import { SafeArea } from "../../../Utility/SafeArea";
import { Text } from "../../../components/typography/text.component";

import { TimeSlotButtonSelected } from "./parking-time-button.styled";
import { TimeSlotButtonUnselected } from "./parking-time-button.styled";

export const ParkingIndividualTime = ({ timeSlot: timeSlot }) => {
  const selectedTimeState = useSelector(
    (state) => state.timeSelectedSlice.selectedTime
  );
  const selectedTimeArrayState = useSelector(
    (state) => state.timeSelectedSlice.selectedTimeArray
  );
  const dispatch = useDispatch();
  //   console.log(`This is the time selected from Work ${selectedTimeState}`);
  var thisTheSelectedTime = false;
  if (selectedTimeState === timeSlot) {
    thisTheSelectedTime = true;
  }

  thisTheSelectedTime = selectedTimeArrayState.find(
    (oldTimeSlot) => oldTimeSlot === timeSlot
  );

 
  return (
    <SafeArea>
      {thisTheSelectedTime ? (
        <TimeSlotButtonSelected
          disabled={false}
          // onPress={() => dispatch(timeSlotPicked(timeSlot))}
          onPress={() => dispatch(deletTimeSlotAction(timeSlot))}
        >
          <Text center variant="timeButtonText" numberOfLines={3}>
            {timeSlot}
          </Text>
        </TimeSlotButtonSelected>
      ) : (
        <TimeSlotButtonUnselected
          disabled={false}
          // onPress={() => dispatch(timeSlotPicked(timeSlot))}
          onPress={() => dispatch(timeSlotPickedArrayAction(timeSlot))}
        >
          <Text center variant="timeButtonText" numberOfLines={3}>
            {timeSlot}
          </Text>
        </TimeSlotButtonUnselected>
      )}
    </SafeArea>
  );
};
