import React, { useEffect, useState } from "react";
import { Button, List } from "react-native-paper";
import { FlatList } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeArea } from "../../../Utility/SafeArea";
import { Picker } from "@react-native-picker/picker";

import styled from "styled-components/native";
import moment from "moment";

import { useSelector } from "react-redux";
import { db } from "../../../Utility/firebase.utils";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { async } from "@firebase/util";
import PickerComponent from "../components/picker.parkingLoots";
import { Text } from "../../../components/typography/text.component";
import { View } from "react-native";
import { BookingList } from "../components/bookings-list.styles";
import { LoadingIndicator, LoadingIndicatorCustom } from "../components/loading.indicator";
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
  const currentUserID = useSelector((state) => state.firebaseAuthSlice.userUID);
  const parkingLots = useSelector((state) => state.firestoreSlice.parkingLots);
  var parkingLotsWithAdded = [{name: "Parking Slots"}, ...parkingLots]
  const [parkingLotsForPicker, updateParkingLotsForPicker] = useState([])
  const parkingSlotsuID = useSelector(
    (state) => state.firestoreSlice.parkingSlotsuID
  );
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

  const [parkingLotsLocal, setParkingLotsLocal] = useState([
    "Hello there",
    "Please show this",
  ]);

  useEffect(() => {
    console.log(
      `!!!!!!!!!!!!!!! These are the parking lots ${JSON.stringify(
        parkingLots,
        null,
        2
      )}`
    );
    // setParkingLotsLocal(parkingSlots)
    console.log(`Hello there: ${parkingLotsWithAdded}`)
    getTheTimeStamps();
  }, []);

  // We will run this once the state is updated with the current time array.
  useEffect(() => {
    // console.log(`Re-render`)
    // setParkingLotsLocal(parkingSlots)
    // getTheBookedParkings();
    // console.log(`These are the parking lots ${parkingLots[0]}`)
  }, [timeStamp1, showPicker, parkingLotSelectedName]);

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
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      arrayOfBookingsObjects.push(doc.data());
    });
    console.log(
      `This is the size of the query result array: ${JSON.stringify(
        arrayOfBookingsObjects.length,
        null,
        2
      )}`
    );

    if (arrayOfBookingsObjects.length === 0){
      // We no bookings at the time
      setBookingAvailable(false)
    }else{
      // We have bookings at the time
      setBookingAvailable(true)
    }

    setLoading(!loading);
    setBookings(arrayOfBookingsObjects);
    setShowLoader(false)

    // Once we get the data
    // setIsLoading(false);
  };

  const getTheTimeStamps = async () => {
    // We will get the time stamp of current and next date

    let parkingTimeSlotsRecieved = [];
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

      const dateInString = localDate_fromUnix.slice(0, 10);
      updateCurrentDate(dateInString)
      var timeStamp = moment(dateInString, "MM/DD/YYYY").unix();
      // console.log(`Today's stamp ${timeStamp}`)

      // console.log(`Time Value is: ${localDate_fromUnix.slice(11,22)}`);
      var sendToGet_24hrs = localDate_fromUnix.slice(11, 22);
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
    var currentTimeToConvert = localDate_fromUnix_2.slice(11, 22);
    var currentHoursIn24hours = convertTime(currentTimeToConvert);
    console.log(`Current Time !!! ${currentHoursIn24hours}`)
    updateCurrentTimeHour(parseInt(currentHoursIn24hours))

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
    // console.log(`Time Stamp 1: ${JSON.stringify(timeStamp1[0].timeStampInt, null, 2)}`);
    // console.log(`Time Stamp 2: ${timeStamp2[0].timeStampInt}`);
    updateTimeStamp1(timeStamp1[0].timeStampInt);
    updateTimeStamp2(timeStamp2[0].timeStampInt);
  };

  const onValueChangePicker = (itemValue, itemIndex) => {
    setSelectedParkingUIDValue(itemValue);
    console.log(`we are here boss!!!`);
    setShowPicker(false);
    // setParkingLotSelectedName(parkingLots[itemIndex].name);
    if (itemIndex ==0){
      setParkingLotSelectedName("Choose A Parking Slot");
      setShowLoader(false)
      setBookingAvailable(false)
     setLoading(!loading);
    }else {
      setParkingLotSelectedName(parkingLotsWithAdded[itemIndex].name);
      getTheBookedParkings(itemValue);
    }
    // Search For Bookings.
    setShowLoader(true)
  };

  const chooseParkingLotPressed = () => {
    setShowPicker(true);
    setLoading(false);
  };

  return (
    <SafeArea>
      {/* <PickerComponent></PickerComponent> */}
      <View style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}>
        <Button mode="contained" onPress={chooseParkingLotPressed}>
          {/* <Text variant = "label">Choose a Parking Lot</Text> */}
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
          {/* <Picker.Item label="" value=""></Picker.Item> */}
          {/* <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" /> */}
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
      {!loading ? 
      (showLoader && <PaymentProcessing></PaymentProcessing>)
      :
      ( bookingAvailable ? 
        <BookingList
          data={bookings}
          renderItem={({item}) => {
            console.log(`Each booking name ${JSON.stringify(item, null, 2)}`)
            return (
              <YourParkingItem
                title= {`Parking Slot: ${item.parkingSlot}`}
                // description={`Duration ${item.timeInt}:00 to ${item.timeInt+1}:00`}
                description={`Duration ${item.timeInt}:00 to ${(item.timeInt !== 23) ? item.timeInt+1 : item.timeInt-23}:00`}

                left={(props) => (
                  <List.Icon {...props} color="black" icon="car" />
                )}
                onPress={() =>
                  navigation.navigate("QR Code", {
                    booking: item
                  })
                }
              />
            );
          }}
          keyExtractor={(item) => item.parkingID}
        />
        :<View style= {{marginTop: 50}}>
          <Text variant="alert">No Bookings Found :(</Text>
        </View>
      )}
    </SafeArea>
  );
};
