import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { pushTimeSlotDetails } from "../../../redux/parkingSlice";
import { SafeArea } from "../../../Utility/SafeArea";
import { ParkingInfoCard } from "../components/parking-info-card.component";
import { ParkingTimePickerBar } from "../components/parking-time-picker.bar";
import { ParkingHoursPicker } from "../components/parking-hours.picker";
import { ParkingCheckoutComponent } from "../components/parking-checkout";
import { LoadingAvailability } from "../components/parking-checkout.styles";
import moment from "moment/moment";

export const EachParkingScreen = ({ route, navigation }) => {
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
  if (selecteTimeSlot !== "") {
    showHoursPickerComponent = true;
  }
  const { parking } = route.params;
  const [parkingTimeSlots, setParkingTimeSlots] = useState([]);
  useEffect(() => {
    console.log(`Parking ${parking.name}`);
    navigation.setOptions({
      title: parking.name,
    });
    /*
    let parkingTimeSlotsRecieved = [];
    var unixTimestamp = Date.now();

    var localDate = new Date(unixTimestamp).toLocaleString("en-US", {
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
    */
    // We will develop the logic here to get the timeSlots with other details such
    // Time in string
    // Time in Int
    // Timestamp for the date

    let parkingTimeSlotsRecieved = [];

    // console.log(`............XXXXXXXXXXXXXXXXXXXXXX.........`);
    var unixTimestamp_2 = Date.now();
    var localDate_fromUnix = new Date(unixTimestamp_2).toLocaleString("en-GB", {
      localeMatcher: "best fit",
      timeZoneName: "short",
    });

    for (let i = 1; i < 24; i++) {
      unixTimestamp_2 = unixTimestamp_2 + 3600000;
      var localDate_fromUnix = new Date(unixTimestamp_2).toLocaleString(
        "en-GB",
        {
          localeMatcher: "best fit",
          timeZoneName: "short",
        }
      );
      // console.log(`Complete Date: ${localDate_fromUnix}`);

      var localTime = new Date(unixTimestamp_2).toLocaleString("en-US", {
        localeMatcher: "best fit",
        timeZoneName: "short",
        timeStyle: "short",
      });

      const dateInString = localDate_fromUnix.slice(0, 10);
      var timeStamp = moment(dateInString, "DD/MM/YYYY").unix();
      // console.log(`This is the time stamp: ${timeStamp}`);

      var localTime_24hrs = moment(localTime, ["h:mm A"]).format("HH:mm");
      const timeInString = localTime_24hrs.slice(0, 2);
      let timeDots_2 = ":00";
      let finalTimeInString = timeInString.concat(timeDots_2);
      // console.log(`Time value in string: ${finalTimeInString}`);

      var eachTimeSlotWithDetail = {
        timeSlotInString: finalTimeInString,
        timeStampInt: timeStamp,
        timeInInt: parseInt(timeInString),
      };

      dispatch(pushTimeSlotDetails(eachTimeSlotWithDetail));

      parkingTimeSlotsRecieved.push(finalTimeInString);
    }

    setParkingTimeSlots(parkingTimeSlotsRecieved);
  }, []);

  // const parkingTimeSlots = ["3PM", "4PM", "5PM", "6PM", "7PM"];
  return (
    <SafeArea>
      <ParkingInfoCard parking={parking} />
      <ParkingTimePickerBar timeSlots={parkingTimeSlots} />
      {showHoursPickerComponent && <ParkingHoursPicker></ParkingHoursPicker>}
      {/* {showCheckOutComponent && <LoadingAvailability></LoadingAvailability>} */}
      {searchComplete && <ParkingCheckoutComponent></ParkingCheckoutComponent>}
      {
        //So basically we turn this loader on and then
        // we do your search if we have parking we will show checkout
        // or we will show other.
        // So this will be like isChecking for ability then show that loader
        // if not then we remove it.
      }
      {/* <Text>Hello there ${Object.keys(selectedTimeSlotArrayFromState).length}</Text> */}
    </SafeArea>
  );
};
