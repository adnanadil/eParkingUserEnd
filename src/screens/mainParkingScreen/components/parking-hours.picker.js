import React, { useEffect, useState } from "react";
import styled from "styled-components/native";

import { colors } from "../../../infrastructure/theme/colors";
import { TouchableOpacity } from "react-native";
import { Text } from "../../../components/typography/text.component";
import Ionicons from "@expo/vector-icons/Ionicons";

import { db } from "../../../Utility/firebase.utils";
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";

import { useDispatch, useSelector } from "react-redux";
import {
  decreaseHours,
  increseHours,
  timeSlotPickedArrayAction,
  updateParkingsSlotsFull,
  updatePosition2TimeInt,
  updatePosition2TimeStamp,
  updateSearchCompleted,
  updateSearchPressed,
  updateTimeSlotPickedArray,
  updateTimeSlotPosition2,
  updateTimeSlotToBook
} from "../../../redux/parkingSlice";


import uuid from 'react-native-uuid';

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

export const ParkingHoursPicker = () => {
  const bookingInProgress = useSelector(
    (state) => state.parkingSlice.bookingInProgress
  );
  const searchPressed = useSelector(
    (state) => state.parkingSlice.searchPressed
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
  var TimeSlectedArray = [];

  useEffect(() => {
    pos2 = pos1 + (hoursSelected-1);
    dispatch(updateTimeSlotPosition2(pos2))
    dispatch(updateSearchPressed(false));
    dispatch(updateSearchCompleted(false))
    getTheTimeSlectedArray()
  }, [hoursSelected, timeSelected])

  const onPressForSearchButoon = () => {
    dispatch(updateSearchPressed(true));
    dispatch(updateSearchCompleted(false))
    FireStoreQuery()
  }

  const getTheTimeSlectedArray =() => {
    
    var selectedTimeArrayLocal = []

    for (i = pos1; i <= pos2; i++){
       selectedTimeArrayLocal.push(timeSlotsDetails.find( 
        eachItem => eachItem.position === i))
    }

    // dispatch(timeSlotPickedArrayAction(selectedTimeArrayLocal))
    dispatch(updateTimeSlotPickedArray(selectedTimeArrayLocal))
    updateLocalTimeSlotPickedArray(selectedTimeArrayLocal)
    // console.log(`The LOOPER DOOPER: ${JSON.stringify(selectedTimeArrayLocal.length, null, 2)}`);


    // Gettin the timeStampInt and timeInt for pos2 we need this 
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
    // If the hours slected is 1 
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


    // Here we get the data from firestore and store it in an array.
    var arrayOfObjectsOfTakenParkings = []
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
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
      //bookTheParking(randomAvlParkingSlot)
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
          // console.log(`In Each loop: main loop ${eachItem} current loop ${each.parkingSlot}`)
          if (eachItem === each.parkingSlot){
            // console.log(`We are in here`)
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
        // bookTheParking(randomAvlParkingSlot)
        dispatch(updateSearchCompleted(true))
        dispatch(updateSearchPressed(false));
        // Here we add the parking in the redux which will be added when the 
        // book button is pressed
        dispatch(updateTimeSlotToBook(randomAvlParkingSlot));
      }
    } 
  }


  const bookTheParking = async (parkingSlot) => {
    console.log(`Random Parking ${parkingSlot}`)
    console.log(`Random Parking ${uuid.v4()}`)
    
    // we will add a reservation for each of slots in the chosen range.
    // If only 1 slot is chosen then our timeSlotPickedArray will be of size 1 

    // console.log(`This is the array we will loop through ${JSON.stringify(localTimeSlotPickedArray, null, 2)}`)

    localTimeSlotPickedArray.map((eachTimeEntryToBook) => {
      firestoreFunctionToBook(eachTimeEntryToBook, parkingSlot)
    })
  } 

  const firestoreFunctionToBook = async (eachTimeEntryToBook, parkingSlot) =>{
      await setDoc(doc(db, `reservations-${parkingSlotsuID}`, uuid.v4()), {
        parkingSlot: parkingSlot,
        parkingLot: parkingSlotsuID,
        timeInt: eachTimeEntryToBook.timeInInt,
        timeStamp: eachTimeEntryToBook.timeStampInt,
        timeString: eachTimeEntryToBook.timeSlotInString,
        parkingID: uuid.v4(),
        userID: userID
      });
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
