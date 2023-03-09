import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { SafeArea } from "../../../Utility/SafeArea";
import { ParkingInfoCard } from "../components/parking-info-card.component";
import { ParkingTimePickerBar } from "../components/parking-time-picker.bar";

export const EachParkingScreen = ({ route }) => {
  const [parkingTimeSlots, setParkingTimeSlots] = useState([]);
  useEffect(() => {
    let parkingTimeSlotsRecieved = [];
    var unixTimestamp = Date.now();
    var localDate = new Date(unixTimestamp).toLocaleString("en-GB", {
      localeMatcher: "best fit",
      timeZoneName: "short",
      timeStyle: "short",
    });
    const currentHours = localDate.slice(0, 2);
    var currentHoursInt = parseInt(currentHours);

    var valueToPush = currentHoursInt;

    var theTimeButtonsToShow = [];
    for (let i = 0; i < 23; i++) {
      if (valueToPush === 23) {
        valueToPush = 0;
        theTimeButtonsToShow.push(valueToPush);
      } else {
        theTimeButtonsToShow.push(++valueToPush);
      }
    }

    theTimeButtonsToShow.forEach((time) => {
      let timeInStraing = time.toString();
      let timeDots = ":00";
      let finalTimeToDisplay = timeInStraing.concat(timeDots);
      parkingTimeSlotsRecieved.push(finalTimeToDisplay);
    });

    setParkingTimeSlots(parkingTimeSlotsRecieved);
  }, []);

  const { parking } = route.params;
  //   const parkingTimeSlots = ["3PM", "4PM", "5PM", "6PM", "7PM"];
  return (
    <SafeArea>
      <ParkingInfoCard parking={parking} />
      <ParkingTimePickerBar timeSlots={parkingTimeSlots} />
    </SafeArea>
  );
};
