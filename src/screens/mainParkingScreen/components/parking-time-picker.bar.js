import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

import { ParkingIndividualTime } from "./parking-time-picker.button";
import { useDispatch } from "react-redux";
import { pushTimeSlotDetails } from "../../../redux/parkingSlice";
import moment from "moment/moment";


const ParkingTimePickerWrapper = styled.View`
  padding: 10px;
`;
export const ParkingTimePickerBar = () => {

  const dispatch = useDispatch()
  const [parkingSlotsLocal, updateParkingSlotsLocal] = useState([])

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
    let parkingTimeSlotsRecieved = [];

    var unixTimestamp_2 = Date.now();
    var localDate_fromUnix = new Date(unixTimestamp_2).toLocaleString("en-GB", {
      localeMatcher: "best fit",
      timeZoneName: "short",
    });

    for (let i = 1; i < 24; i++) {
      unixTimestamp_2 = unixTimestamp_2 + 3600000;
      var localDate_fromUnix = new Date(unixTimestamp_2).toLocaleString(
        "en-US",
        {
          localeMatcher: "best fit",
          timeZoneName: "short",
        }
      );
    
      const dateInString = localDate_fromUnix.slice(0, 10);
      var timeStamp = moment(dateInString, "MM/DD/YYYY").unix();
      
      console.log(`Time Value is: ${localDate_fromUnix.slice(11,22)}`);
      var sendToGet_24hrs = localDate_fromUnix.slice(11,22)
      localTime_24hrs = convertTime(sendToGet_24hrs)
      const timeInString = localTime_24hrs.slice(0, 2);
      let timeDots_2 = ":00";
      let finalTimeInString = timeInString.concat(timeDots_2);
      // console.log(`Time value in string: ${finalTimeInString}`);

      var eachTimeSlotWithDetail = {
        timeSlotInString: finalTimeInString,
        timeStampInt: timeStamp,
        timeInInt: parseInt(timeInString),
        position: i
      };

      dispatch(pushTimeSlotDetails(eachTimeSlotWithDetail));

      parkingTimeSlotsRecieved.push(finalTimeInString);
    }

    updateParkingSlotsLocal(parkingTimeSlotsRecieved);
  }, []);

  
  return (
    <ParkingTimePickerWrapper>
      <Spacer variant="left.large">
        <Text variant="title">Time Slots</Text>
      </Spacer>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {parkingSlotsLocal.map((timeSlot) => {
          return (
            <ParkingIndividualTime
              timeSlot = {timeSlot}
              key = {timeSlot}
            />
          );
        })}
      </ScrollView>
    </ParkingTimePickerWrapper>
  );
};
