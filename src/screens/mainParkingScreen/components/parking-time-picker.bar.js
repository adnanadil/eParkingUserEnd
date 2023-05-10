// This is the picker bar which will display all the time slots in which the user can 
// make a booking. 

// In this component lives the logic of getting the current time from the Unix timestamp
// and then getting the current local time and data from this... we then find the next 23 hours
// from the current time in which the users can make a booking at

// The timestamp, data, time and other details are all saved for each time slot and passed as props 
// the buttons of each time which is then stored in the redux state once the time is pressed and that logic
// lives under the ParkingIndividualTime

import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

import { ParkingIndividualTime } from "./parking-time-picker.button";
import { useDispatch } from "react-redux";
import {
  pushTimeSlotDetails,
  resetTimeSlotArrayAction,
  resetTimeSlotDetails,
} from "../../../redux/parkingSlice";
import moment from "moment/moment";

const ParkingTimePickerWrapper = styled.View`
  padding: 10px;
`;
export const ParkingTimePickerBar = () => {
  const dispatch = useDispatch();
  const [parkingSlotsLocal, updateParkingSlotsLocal] = useState([]);
  const [parkingSlotsLocalArrayObject, updateParkingSlotsLocalArrayObject] =
    useState([]);
  const [parkingSlotsLoading, updateParkingSlotsLoading] = useState(true);

 
  // This runs when the component mounts
  useEffect(() => {

    // We reset any values set in the redux to start fresh in each render
    dispatch(resetTimeSlotDetails());
    dispatch(resetTimeSlotArrayAction());

    let parkingTimeSlotsRecieved = [];
    let tempParkingSlotsLocalArrayObject = [];

    // We will loop 23 times get the current time and data in each iteration of the loop 
    // we will update the time and date 

    // the aim is to get 23 time slots to book from 
    for (let i = 0; i < 24; i++) {
      var unixTimestamp_2 = Date.now();
      var localDate_fromUnix = new Date(unixTimestamp_2).toLocaleString(
        "en-GB",
        {
          localeMatcher: "best fit",
          timeZoneName: "short",
        }
      );
      unixTimestamp_2 = unixTimestamp_2 + 3600000 * i;
      var localDate_fromUnix = new Date(unixTimestamp_2).toLocaleString(
        "en-US",
        {
          localeMatcher: "best fit",
          timeZoneName: "short",
        }
      );

      // splitting the local date and time string to get the date and time from it 
      let arrOfTime = localDate_fromUnix.split(" ");

      // Get the needed values which are date, time and timestamp 
      const dateInString = arrOfTime[0];
      var timeStamp = moment(arrOfTime[0], "MM/DD/YYYY").unix();
      console.log(`Today's stamp ${timeStamp}`)

      localTime_24hrs = convertTime(arrOfTime[1] + " " + arrOfTime[2]);
      const timeInString = localTime_24hrs.slice(0, 2);
      let timeDots_2 = ":00";
      let finalTimeInString = timeInString.concat(timeDots_2);

      // Creating a new object of items for each iteration and then this will be saved as an 
      // array of object which we will loop through and show each button which will get the needed props 
      var eachTimeSlotWithDetail = {
        timeSlotInString: finalTimeInString,
        timeStampInt: timeStamp,
        timeInInt: parseInt(timeInString),
        position: i,
        date: dateInString,
      };

      dispatch(pushTimeSlotDetails(eachTimeSlotWithDetail));
      tempParkingSlotsLocalArrayObject.push(eachTimeSlotWithDetail);

      parkingTimeSlotsRecieved.push(finalTimeInString);
    }

    updateParkingSlotsLocal(parkingTimeSlotsRecieved);
    updateParkingSlotsLocalArrayObject(tempParkingSlotsLocalArrayObject);
    updateParkingSlotsLoading((current) => !current);

  }, []);

  const convertTime = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes, seconds] = time.split(":");
    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}`;
  };


// We will have a horizontal layout which will show all the parking lots to do that we will
// loop using map and display a ParkingIndividualTime button for each time slot. 
  return (
    <ParkingTimePickerWrapper>
      <Spacer variant="left.large">
        <Text variant="title">Time Slots</Text>
      </Spacer>

      {
        parkingSlotsLoading ? (
          <View></View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {parkingSlotsLocalArrayObject.map((timeSlot) => {
              return (
                <ParkingIndividualTime
                  timeSlot={timeSlot.timeSlotInString}
                  key={timeSlot.timeSlotInString}
                  timeStampInt={timeSlot.timeStampInt}
                  timeInInt={timeSlot.timeInInt}
                  position={timeSlot.position}
                />
              );
            })}
          </ScrollView>
        )
      }
    </ParkingTimePickerWrapper>
  );
};
