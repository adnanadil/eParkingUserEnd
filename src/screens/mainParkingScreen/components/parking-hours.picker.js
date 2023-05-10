// This is the UI which allows the user to select the number of hours they would like to 
// make a booking for 

// This is also the components which has the logic for looking into the database if we have 
// a parking slot at the selected time and for the selected duration. 

import React, { useEffect, useState } from "react";
import styled from "styled-components/native";

import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.component";
import Ionicons from "@expo/vector-icons/Ionicons";

import { db } from "../../../Utility/firebase.utils";
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";

import { useDispatch, useSelector } from "react-redux";
import {
  decreaseHours,
  increseHours,
  updateParkingsSlotsFull,
  updatePosition2TimeInt,
  updatePosition2TimeStamp,
  updateSearchCompleted,
  updateSearchPressed,
  updateTimeSlotPickedArray,
  updateTimeSlotPosition2,
  updateTimeSlotToBook
} from "../../../redux/parkingSlice";

// Used to generate random IDs
import uuid from 'react-native-uuid';

// We have defined a few simple components we would be using in this component 
const Holder = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ValueButton = styled.TouchableOpacity`
  background-color: ${colors.button.changeValue};
  width: 50;
  height: 50;
  align-items: center;
  justify-content: center;
  margin-left: 10;
  border-radius: 10;
`;

const SearchButton = styled.TouchableOpacity`
  background-color: ${colors.button.search};
  width: 100;
  height: 50;
  align-items: center;
  justify-content: center;
  margin-right: 10;
  border-radius: 10;
`;

// Here is the main function which has the logic to look for empty slots and to display the 
// UI to set the time of the booking. 
export const ParkingHoursPicker = () => {
  const bookingInProgress = useSelector(
    (state) => state.parkingSlice.bookingInProgress
  );
  const hoursSelected = useSelector(
    (state) => state.parkingSlice.hoursSelected
  );
  
  const maxPossibleBookingHours = useSelector(
    (state) => state.parkingSlice.maxBookingHoursPossible
  );

  const pos1 = useSelector(
    (state) => state.parkingSlice.timeSlotPosition1
  );

  const timeSlotsDetails = useSelector(
    (state) => state.parkingSlice.currentlyAvailableTimeSlotsDetails
  );
  
  const parkingSlotsInChosenParkingLot = useSelector(
    (state) => state.firestoreSlice.parkingSlotsInChosenParkingLot
  );

  const parkingSlotsuID = useSelector(
    (state) => state.firestoreSlice.parkingSlotsuID
  );

  const userID = useSelector(
    (state) => state.firebaseAuthSlice.userUID
  );
  
  const position1TimeStamp = useSelector(
    (state) => state.parkingSlice.position1TimeStamp
  );
  const position1TimeInt = useSelector(
    (state) => state.parkingSlice.position1TimeInt
  );
  const position2TimeStamp = useSelector(
    (state) => state.parkingSlice.position2TimeStamp
  );
  const position2TimeInt = useSelector(
    (state) => state.parkingSlice.position2TimeInt
  );
  const timeSelected = useSelector(
    (state) => state.parkingSlice.selectedTime
  );
 
  const [localStatePos2TimeStamp, updateLocalStatePos2TimeStamp] = useState(0)
  const [localStatePos2TimeInt, updateLocalStatePos2TimeInt] = useState(0)
  const [localTimeSlotPickedArray, updateLocalTimeSlotPickedArray] = useState([])

  const dispatch = useDispatch();

  var pos2 = 0;

  // we re-render and run the functions in the useEffect if either the time slot is changed
  // or the hoursSelected is changed
  useEffect(() => {
    pos2 = pos1 + (hoursSelected-1);
    dispatch(updateTimeSlotPosition2(pos2))
    dispatch(updateSearchPressed(false));
    dispatch(updateSearchCompleted(false))
    getTheTimeSlectedArray()
  }, [hoursSelected, timeSelected])

  // This is the function which runs when we press the search icon and it checks 
  // in the database if we have available parking spots based on the time and hours 
  // the parking needs to be booked for.  
  const onPressForSearchButoon = () => {
    dispatch(updateSearchPressed(true));
    dispatch(updateSearchCompleted(false))
    FireStoreQuery()
  }

  const getTheTimeSlectedArray =() => {
    
    var selectedTimeArrayLocal = []
    // Pos1 is the position of the time slot that is selected from this we will get 
    // Pos2 which is the time slot until when the parking is needed. If the current time is 
    // 8 and the user choose a time slot of 9 then Pos1 is 1 and if the users choose three hours
    // the Pos2 should be 4 this logic is in the use effect now we are looping through and saving the 
    // time slots that match the positions from 1 to 4 for our example. 
    for (i = pos1; i <= pos2; i++){
       selectedTimeArrayLocal.push(timeSlotsDetails.find( 
        eachItem => eachItem.position === i))
    }

    dispatch(updateTimeSlotPickedArray(selectedTimeArrayLocal))
    updateLocalTimeSlotPickedArray(selectedTimeArrayLocal)


    // Getting the timeStampInt and timeInt for pos2 we need this 
    // in the firebase query as a condition. 
    var lastPositionTimeObject = selectedTimeArrayLocal.find( 
      eachItem => eachItem.position === pos2)

    dispatch(updatePosition2TimeStamp(lastPositionTimeObject.timeStampInt))
    dispatch(updatePosition2TimeInt(lastPositionTimeObject.timeInInt))
    
    // Updating the local state.
    updateLocalStatePos2TimeStamp(lastPositionTimeObject.timeStampInt)
    updateLocalStatePos2TimeInt(lastPositionTimeObject.timeStampInt)
  } 

  const FireStoreQuery = async () => {

    console.log(`Data to query date range ${position1TimeStamp}, ${position2TimeStamp} and the time range ${position1TimeInt}, ${position2TimeInt}`)

    // We make the query here and find the parkings
    // that are in the range of to be booked slots 
    // and we use timeStamp and the time range to
    // limit our search.  

    let q;
    // If the hours selected is 1 
    if (position1TimeStamp === position2TimeStamp) {
      q = query(collection(db, 
        `reservations-${parkingSlotsuID}`), 
        where("timeStamp", "==", position1TimeStamp), 
        where("timeStamp", "==", localStatePos2TimeStamp),
        where("timeInt", "==", position1TimeInt), 
      );
    }
    // more than an hour
    if (position1TimeStamp !== position2TimeStamp) {
      q = query(collection(db, 
        `reservations-${parkingSlotsuID}`), 
        where("timeStamp", "==", position1TimeStamp), 
        where("timeStamp", "==", localStatePos2TimeStamp),
        where("timeInt", "<=", position1TimeInt), 
        where("timeInt", ">=", localStatePos2TimeInt),
      );
    }


    // Here we get the data from Firestore and storing it in an array.
    var arrayOfObjectsOfTakenParkings = []
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      arrayOfObjectsOfTakenParkings.push(doc.data())
    });
    console.log(`This is the size of the query result array: ${JSON.stringify(arrayOfObjectsOfTakenParkings.length, null, 2)}`);

    // We check if the size is zero means we didn't find the result
    // THIS ALSO MEANS ALL SLOTS ARE FREE TO CHOOSE.
    var sizeIsZero = true

    if (arrayOfObjectsOfTakenParkings.length === 0) {
      // This means that none of the parking slots are booked 
      // at that time and date.
      sizeIsZero = true
      
      const randomIndex = Math.floor(Math.random() * parkingSlotsInChosenParkingLot.length);
      // get random item
      const randomAvlParkingSlot = parkingSlotsInChosenParkingLot[randomIndex];
      dispatch(updateTimeSlotToBook(randomAvlParkingSlot))
      dispatch(updateParkingsSlotsFull(false))
      dispatch(updateSearchCompleted(true))
      dispatch(updateSearchPressed(false));
      console.log('NONE OF THE SLOTS ARE TAKEN')
    }else {
      sizeIsZero = false
    }

    // Getting the names of the taken parkings.
    // Here we loop through the parkingSlots that we got when getting 
    // the parking in the main page but saved in redux in eachparking page
    // we then find the parkings which booked at the time 
    // from this we will then filer to find the find the parkings which are 
    // not booked and if all all are booked we say that parkings are 
    // full and book another slot. 
    var parkingsTaken = []
    if (!sizeIsZero){
      parkingSlotsInChosenParkingLot.map((eachItem) => {
        var pushThisParking = ""
        var containsParking = arrayOfObjectsOfTakenParkings.find((each) => {
          if (eachItem === each.parkingSlot){
            pushThisParking = each.parkingSlot
            return true
          }
        })
        if (containsParking){
          parkingsTaken.push(pushThisParking)   
        }
      })
      console.log(`Parkings Booked: ${parkingsTaken}`)

      // IF all the slots are full ... 
      if (parkingSlotsInChosenParkingLot.length === parkingsTaken.length){
        // All slots are full.. you can't book parking. 
        dispatch(updateParkingsSlotsFull(true))
        dispatch(updateSearchCompleted(true))
        dispatch(updateSearchPressed(false));
        console.log('ALL SLOTS ARE FULL')
      }else {
        // Filter and get the slots which are not taken 
        // Then randonly choose a parking slot and book for 
        // each time slot as a seperate reservation.
        // https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript
        
        dispatch(updateParkingsSlotsFull(false))
        console.log('AVAILABLE')
        
        let difference = parkingSlotsInChosenParkingLot.filter(x => !parkingsTaken.includes(x));
        
        // get random index value
        const randomIndex = Math.floor(Math.random() * difference.length);

        // get random item
        const randomAvlParkingSlot = difference[randomIndex];
        dispatch(updateSearchCompleted(true))
        dispatch(updateSearchPressed(false));
        // Here we add the parking in the redux which will be added when the 
        // book button is pressed
        dispatch(updateTimeSlotToBook(randomAvlParkingSlot));
      }
    } 
  }


  const decreasePressed = () => {
    dispatch(decreaseHours())
  }

  const increasePressed = () => {
    dispatch(increseHours(maxPossibleBookingHours))
  }

  return (
    <Holder>
      <ValueButton
        disabled={bookingInProgress}
        onPress={decreasePressed}
      >
        <Text variant="hourValueButton">-</Text>
      </ValueButton>
      <Text variant="title">{hoursSelected}</Text>
      <ValueButton
        onPress={increasePressed}
        disabled={bookingInProgress}
      >
        <Text variant="hourValueButton">+</Text>
      </ValueButton>
      <SearchButton
        onPress={onPressForSearchButoon}
        disabled={bookingInProgress}
      >
        <Ionicons name="md-search" size={32} color="white" />
      </SearchButton>
    </Holder>
  );
};
