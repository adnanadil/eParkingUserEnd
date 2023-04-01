import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

import { ParkingIndividualTime } from "./parking-time-picker.button";
import { useDispatch } from "react-redux";
import { pushTimeSlotDetails, resetTimeDetailsArray, resetTimeSlotArrayAction, resetTimeSlotDetails, timeSlotPickedArrayAction, updateTimeDetailsArray } from "../../../redux/parkingSlice";
import moment from "moment/moment";


const ParkingTimePickerWrapper = styled.View`
  padding: 10px;
`;
export const ParkingTimePickerBar = () => {

  const dispatch = useDispatch()
  const [parkingSlotsLocal, updateParkingSlotsLocal] = useState([])
  const [parkingSlotsLocalArrayObject, updateParkingSlotsLocalArrayObject] = useState([])
  const [parkingSlotsLoading, updateParkingSlotsLoading] = useState(true)

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

//  const toUnixTime = (year, month, day, hr) => {
 const toUnixTime = (year, month, day) => {
  const date = new Date(Date.UTC(year, month - 1));
  return Math.floor(date.getTime()/1000);
}
 
  useEffect(() => {
    dispatch(resetTimeSlotDetails());
    dispatch(resetTimeSlotArrayAction());

    let parkingTimeSlotsRecieved = [];
    let tempParkingSlotsLocalArrayObject = [];

    var unixTimestamp_2 = Date.now();
    var localDate_fromUnix = new Date(unixTimestamp_2).toLocaleString("en-GB", {
      localeMatcher: "best fit",
      timeZoneName: "short",
    });

    console.log(`Show this date ${localDate_fromUnix}`)

    for (let i = 1; i < 24; i++) {
      unixTimestamp_2 = unixTimestamp_2 + 3600000;
      var localDate_fromUnix = new Date(unixTimestamp_2).toLocaleString(
        "en-US",
        {
          localeMatcher: "best fit",
          timeZoneName: "short",
        }
      );

      let arrOfTime = localDate_fromUnix.split(' ')
    
      const dateInString = localDate_fromUnix.slice(0, 10);
      // var timeStamp = moment(dateInString, "MM/DD/YYYY").unix();
      var timeStamp = moment(arrOfTime[0], "MM/DD/YYYY").unix();
      // console.log(`Today's stamp ${timeStamp}`)
      
      // console.log(`Time Value is: ${localDate_fromUnix.slice(11,22)}`);
      var sendToGet_24hrs = localDate_fromUnix.slice(11,22)
      // localTime_24hrs = convertTime(sendToGet_24hrs)
      localTime_24hrs = convertTime(arrOfTime[1] + " " + arrOfTime[2])
      const timeInString = localTime_24hrs.slice(0, 2);
      let timeDots_2 = ":00";
      let finalTimeInString = timeInString.concat(timeDots_2);
      // console.log(`Time value in string: ${finalTimeInString}`);

      var eachTimeSlotWithDetail = {
        timeSlotInString: finalTimeInString,
        timeStampInt: timeStamp,
        timeInInt: parseInt(timeInString),
        position: i,
        date: dateInString
      };

      dispatch(pushTimeSlotDetails(eachTimeSlotWithDetail));
      // dispatch(timeSlotPickedArrayAction(eachTimeSlotWithDetail));
      // dispatch(updateTimeDetailsArray(eachTimeSlotWithDetail));
      tempParkingSlotsLocalArrayObject.push(eachTimeSlotWithDetail)

      parkingTimeSlotsRecieved.push(finalTimeInString);
    }

    updateParkingSlotsLocal(parkingTimeSlotsRecieved);
    updateParkingSlotsLocalArrayObject(tempParkingSlotsLocalArrayObject);
    // console.log(parkingSlotsLocalArrayObject);
    updateParkingSlotsLoading(current => !current)
    
    // const unixTimestamp = toUnixTime(2022, 12, 31, 12, 33, 0);
    // const unixTimestamp = toUnixTime(2023, 14, 3);
    // console.log(unixTimestamp);   // 1672489980
  }, []);

  
  return (
    <ParkingTimePickerWrapper>
      <Spacer variant="left.large">
        <Text variant="title">Time Slots</Text>
      </Spacer>

      {parkingSlotsLoading ? <View></View> :
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {parkingSlotsLocalArrayObject.map((timeSlot) => {
          return (
            <ParkingIndividualTime
              timeSlot = {timeSlot.timeSlotInString}
              key = {timeSlot.timeSlotInString}
              timeStampInt = {timeSlot.timeStampInt}
              timeInInt = {timeSlot.timeInInt} 
              position = {timeSlot.position}
            />
          );
        })}
      </ScrollView>

        /* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {parkingSlotsLocal.map((timeSlot) => {
          return (
            <ParkingIndividualTime
              timeSlot = {timeSlot}
              key = {timeSlot}
            />
          );
        })}
      </ScrollView> */
      
      }
    </ParkingTimePickerWrapper>
  );
};
