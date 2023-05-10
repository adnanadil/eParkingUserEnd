// This is the page which is show when the user click to see their bookings
// We have button at the top of the screen to allow the user to select a parking lot for which they would like to
// see the booking for and this will show a picker to choose the parking lot for which they would
// like to see the booking for.
// The list then shows all the bookings for the current user in that parking lot.

import React, { useEffect, useState } from "react";
import { Button, List } from "react-native-paper";
import { SafeArea } from "../../../Utility/SafeArea";
import { Picker } from "@react-native-picker/picker";

import styled from "styled-components/native";
import moment from "moment";

import { useSelector } from "react-redux";
import { db } from "../../../Utility/firebase.utils";
import { collection, query, where, getDocs, setDoc } from "firebase/firestore";
import { Text } from "../../../components/typography/text.component";
import { View } from "react-native";
import { BookingList } from "../components/bookings-list.styles";
import { PaymentProcessing } from "../../mainParkingScreen/components/parking-checkout.styles";

const YourParkingItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;

export const MoveButton = styled(Button).attrs({
  color: "black",
})`
  padding: ${(props) => props.theme.space[2]};
`;

export const YourParkingScreen = ({ navigation }) => {
  // Defining the state and redux variables to be used
  const currentUserID = useSelector((state) => state.firebaseAuthSlice.userUID);
  const parkingLots = useSelector((state) => state.firestoreSlice.parkingLots);
  var parkingLotsWithAdded = [{ name: "Parking Slots" }, ...parkingLots];
  const [parkingSlots, updateParkingSlots] = useState([]);
  const [timeStamp1, updateTimeStamp1] = useState("");
  const [currentTimeHour, updateCurrentTimeHour] = useState("");
  const [currentDate, updateCurrentDate] = useState("");
  const [timeStamp2, updateTimeStamp2] = useState("");
  const [bookings, setBookings] = useState([]);

  const [selectedParkingUIDValue, setSelectedParkingUIDValue] = useState();
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [bookingAvailable, setBookingAvailable] = useState(false);
  const [parkingLotSelectedName, setParkingLotSelectedName] = useState("");

  // Once the component is mounted we will get the current date and time
  useEffect(() => {
    getTheTimeStamps();
  }, []);

  // We will run this once the state is updated with the current time array to re-render the  view
  useEffect(() => {}, [timeStamp1, showPicker, parkingLotSelectedName]);

  // We will get the bookings for the specific user at the parking lot and we are using the userID for this
  const getTheBookedParkings = async (itemValue) => {
    console.log(`We will work on getting the parking for ${itemValue}`);
    console.log(`Today ${timeStamp1}`);
    console.log(`Now Hours: ${currentTimeHour}`);
    console.log(`For user ${currentUserID}`);
    const q = query(
      collection(db, `reservations-${itemValue}`),
      where("timeStamp", "==", timeStamp1),
      where("timeInt", ">=", currentTimeHour),
      where("userID", "==", currentUserID)
    );

    var arrayOfBookingsObjects = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      arrayOfBookingsObjects.push(doc.data());
    });
    console.log(
      `This is the size of the query result array: ${JSON.stringify(
        arrayOfBookingsObjects.length,
        null,
        2
      )}`
    );

    if (arrayOfBookingsObjects.length === 0) {
      // We have no bookings at the time
      setBookingAvailable(false);
    } else {
      // We have bookings at the time
      setBookingAvailable(true);
    }

    setLoading(!loading);
    setBookings(arrayOfBookingsObjects);
    setShowLoader(false);

    // Once we get the data
    // setIsLoading(false);
  };

  const getTheTimeStamps = async () => {
    // We will get the time stamp of current and next date

    let tempParkingSlotsLocalArrayObject = [];

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

      const timeStringSplitArray = localDate_fromUnix.split(" ");

      const dateInString = timeStringSplitArray[0];
      updateCurrentDate(dateInString);
      var timeStamp = moment(dateInString, "MM/DD/YYYY").unix();

      var sendToGet_24hrs =
        timeStringSplitArray[1] + " " + timeStringSplitArray[2];
      localTime_24hrs = convertTime(sendToGet_24hrs);
      const timeInString = localTime_24hrs.slice(0, 2);
      let timeDots_2 = ":00";
      let finalTimeInString = timeInString.concat(timeDots_2);
      console.log(`Time value in string: ${finalTimeInString}`);

      var eachTimeSlotWithDetail = {
        timeSlotInString: finalTimeInString,
        timeStampInt: timeStamp,
        timeInInt: parseInt(timeInString),
        position: i,
      };

      tempParkingSlotsLocalArrayObject.push(eachTimeSlotWithDetail);
    }

    var unixTimestamp_3 = Date.now();
    var localDate_fromUnix_2 = new Date(unixTimestamp_3).toLocaleString(
      "en-US",
      {
        localeMatcher: "best fit",
        timeZoneName: "short",
      }
    );
    const timeStringSplitArray_2 = localDate_fromUnix_2.split(" ");
    var currentTimeToConvert =
      timeStringSplitArray_2[1] + " " + timeStringSplitArray_2[2];
    var currentHoursIn24hours = convertTime(currentTimeToConvert);
    console.log(`Current Time !!! ${currentHoursIn24hours}`);
    updateCurrentTimeHour(parseInt(currentHoursIn24hours));

    updateParkingSlots(tempParkingSlotsLocalArrayObject);
    getTheTimeStampsString(tempParkingSlotsLocalArrayObject);
  };

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

  const getTheTimeStampsString = (tempParkingSlotsLocalArrayObject) => {
    var timeStamp1 = tempParkingSlotsLocalArrayObject.filter(
      (eachItem) => eachItem.position === 1
    );
    var timeStamp2 = tempParkingSlotsLocalArrayObject.filter(
      (eachItem) => eachItem.position === 23
    );
    updateTimeStamp1(timeStamp1[0].timeStampInt);
    updateTimeStamp2(timeStamp2[0].timeStampInt);
  };

  // This function is run when a value is selected on the picker based on the parking lot chosen
  // we set its id as the parking lot which is selected and based on this we will search the database
  const onValueChangePicker = (itemValue, itemIndex) => {
    setSelectedParkingUIDValue(itemValue);
    setShowPicker(false);
    if (itemIndex == 0) {
      setParkingLotSelectedName("Choose A Parking Slot");
      setShowLoader(false);
      setBookingAvailable(false);
      setLoading(!loading);
    } else {
      setParkingLotSelectedName(parkingLotsWithAdded[itemIndex].name);
      getTheBookedParkings(itemValue);
    }
    // Search For Bookings.
    setShowLoader(true);
  };

  // Function run when the choose parking lot button is pressed.
  const chooseParkingLotPressed = () => {
    setShowPicker(true);
    setLoading(false);
  };

  // Here we display the imported elements and we have developed logic based on ternary operations
  // to show the correct element based on the status of the app and the data of it.
  return (
    <SafeArea>
      <View style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}>
        <Button mode="contained" onPress={chooseParkingLotPressed}>
          Choose a Parking Lot
        </Button>
      </View>
      {showPicker && (
        <Picker
          style={{ margin: 0 }}
          prompt="Choose Parking Lot"
          selectedValue={selectedParkingUIDValue}
          onValueChange={(itemValue, itemIndex) =>
            onValueChangePicker(itemValue, itemIndex)
          }
        >
          {parkingLotsWithAdded.map((eachParking) => {
            return (
              <Picker.Item
                label={eachParking.name}
                value={eachParking.uID}
              ></Picker.Item>
            );
          })}
        </Picker>
      )}
      {!showPicker && (
        <View style={{ marginLeft: 10, marginTop: 10 }}>
          <Text variant="title">{`${parkingLotSelectedName}`}</Text>
        </View>
      )}
      {!loading ? (
        showLoader && <PaymentProcessing></PaymentProcessing>
      ) : bookingAvailable ? (
        <BookingList
          data={bookings}
          renderItem={({ item }) => {
            console.log(`Each booking name ${JSON.stringify(item, null, 2)}`);
            return (
              <YourParkingItem
                title={`Parking Slot: ${item.parkingSlot}`}
                // description={`Duration ${item.timeInt}:00 to ${item.timeInt+1}:00`}
                description={`Duration ${item.timeInt}:00 to ${
                  item.timeInt !== 23 ? item.timeInt + 1 : item.timeInt - 23
                }:00`}
                left={(props) => (
                  <List.Icon {...props} color="black" icon="car" />
                )}
                onPress={() =>
                  navigation.navigate("QR Code", {
                    booking: item,
                  })
                }
              />
            );
          }}
          keyExtractor={(item) => item.parkingID}
        />
      ) : (
        <View style={{ marginTop: 50 }}>
          <Text variant="alert">No Bookings Found :(</Text>
        </View>
      )}
    </SafeArea>
  );
};
