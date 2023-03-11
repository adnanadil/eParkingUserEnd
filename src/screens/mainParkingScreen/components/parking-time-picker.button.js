import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { timeSlotPicked } from "../../../redux/parkingSlice";
import { timeSlotPickedArrayAction } from "../../../redux/parkingSlice";
import { deletTimeSlotAction } from "../../../redux/parkingSlice";
import { SafeArea } from "../../../Utility/SafeArea";
import { Text } from "../../../components/typography/text.component";

import { TimeSlotButtonSelected } from "./parking-time-button.styled";
import { TimeSlotButtonUnselected } from "./parking-time-button.styled";

import moment from "moment/moment";

// import * as firebase from "firebase";
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";

import { app } from "../../../Utility/firebase.utils";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";

export const ParkingIndividualTime = ({ timeSlot: timeSlot }) => {
  const callMePlease = () => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log("We have a user");
        // ...
      } else {
        // User is signed out
        // ...
        console.log("NO user !!!");
      }
    });
    createUserWithEmailAndPassword(auth, "addu@gmail.com", "password")
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Sign up success !!!");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Sign up Fail !!!");
        // ..
      });
  };

  const thisFunction = () => {
    console.log("New new");
  };

  const selectedTimeState = useSelector(
    (state) => state.parkingSlice.selectedTime
  );
  const selectedTimeArrayState = useSelector(
    (state) => state.parkingSlice.selectedTimeArray
  );
  const bookingInProgress = useSelector(
    (state) => state.parkingSlice.bookingInProgress
  );
  const organizations = useSelector(
    (state) => state.parkingSlice.currentlyAvailableTimeSlotsDetails
  );
  const dispatch = useDispatch();
  //   console.log(`This is the time selected from Work ${selectedTimeState}`);
  var thisTheSelectedTime = false;
  if (selectedTimeState === timeSlot) {
    thisTheSelectedTime = true;
  }

  // thisTheSelectedTime = selectedTimeArrayState.find(
  //   (oldTimeSlot) => oldTimeSlot === timeSlot
  // );

  const pleaseDoThis = () => {
    var unixTimestamp = Date.now();

    var localDate2 = new Date(unixTimestamp).toLocaleString("en-GB", {
      localeMatcher: "best fit",
      timeZoneName: "short",
    });
    console.log(`wassup Addu ${localDate2}`);
    // var unixTimestamp_2 = moment('2012.08.10', 'YYYY.MM.DD').unix();
    var unixTimestamp_2 = moment("11/03/2023", "DD/MM/YYYY").unix();
    console.log(`NO No ${unixTimestamp_2}`);
    var unixTimestamp_3 = moment("11/03/2023", "DD/MM/YYYY").unix();
    console.log(`NO No ${unixTimestamp_3}`);
    console.log(`NO No ${unixTimestamp_3 - unixTimestamp_2}`);
    // Logic the time stamp that I will save in the reservation will be
    // the current date time stamp if we are going in a sequence that is

    // Adding date with the time slot.
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
      var unixTimestamp_2 = Date.now();
      let toto = unixTimestamp_2 + 60 * 60 * 1000 * (i + 1);
      // console.log(`One Hour into the future ${toto}`)
      var localDate_toto = new Date(toto).toLocaleString("en-GB", {
        localeMatcher: "best fit",
        timeZoneName: "short",
      });
      // console.log(`One Hour into the future ${localDate_toto}`)
    }
  };

  return (
    <SafeArea>
      {thisTheSelectedTime ? (
        <TimeSlotButtonSelected
          disabled={false}
          // onPress={() => dispatch(timeSlotPicked(timeSlot))}
          // onPress={() => dispatch(deletTimeSlotAction(timeSlot))}
          onPress={callMePlease}
          // onPress={() => console.log(JSON.stringify(organizations, null, 2))}
        >
          <Text center variant="timeButtonText" numberOfLines={3}>
            {timeSlot}
          </Text>
        </TimeSlotButtonSelected>
      ) : (
        <TimeSlotButtonUnselected
          disabled={bookingInProgress}
          // onPress={pleaseDoThis}
          onPress={() => dispatch(timeSlotPicked(timeSlot))}
          // onPress={() => dispatch(timeSlotPickedArrayAction(timeSlot))}
        >
          <Text center variant="timeButtonText" numberOfLines={3}>
            {timeSlot}
          </Text>
        </TimeSlotButtonUnselected>
      )}
    </SafeArea>
  );
};
