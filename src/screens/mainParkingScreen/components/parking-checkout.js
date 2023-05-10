// This is the section that is below the time slot picker (below the hours picker). It is the 
// component which allows the user to enter their name, credit card details and then make a booking 

import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../Utility/SafeArea";

import { CreditCardInputComponent } from "../components/credit-card.component";

import uuid from 'react-native-uuid';

import {
  NameInput,
  PayButton,
  PaymentProcessing,
  TotalHolder,
} from "../components/parking-checkout.styles";
import { updateBookingInProgress } from "../../../redux/parkingSlice";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../Utility/firebase.utils";
import { ModalView } from "./modal";

// The main ParkingCheckoutComponent function which will be exported to display the component and run its functionality
export const ParkingCheckoutComponent = ({navigation}) => {
  const dispatch = useDispatch();
  
  const parkingSlotsuID = useSelector(
    (state) => state.firestoreSlice.parkingSlotsuID
  );
  const bookingInProgress = useSelector(
    (state) => state.parkingSlice.bookingInProgress
  );
  const timeSlotPickedArray = useSelector(
    (state) => state.parkingSlice.selectedTimeArray
  );
  const parkingSlot = useSelector(
    (state) => state.parkingSlice.timeSlotToBook
  );
  const userID = useSelector(
    (state) => state.firebaseAuthSlice.userUID
  );
  const userEmail = useSelector(
    (state) => state.firebaseAuthSlice.userEmail
  );
  const parkingsSlotsFull = useSelector(
    (state) => state.firebaseAuthSlice.parkingsSlotsFull
  );
  const costPerHour = useSelector(
    (state) => state.firestoreSlice.costPerHour
  );
  const parkingSlotName = useSelector(
    (state) => state.firestoreSlice.parkingSlotName
  );
  const position1TimeInt = useSelector(
    (state) => state.parkingSlice.position1TimeInt
  );
  const position2TimeInt = useSelector(
    (state) => state.parkingSlice.position2TimeInt
  );
  const [name, setName] = useState("");
  const [card, setCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  

  useEffect(() => {
    // Re-render in these conditions
    console.log(`Take this: ${parkingSlot}`)
    console.log(`Take this: ${timeSlotPickedArray}`)
  }, [parkingSlot, parkingsSlotsFull, timeSlotPickedArray, error])

  // Book button pressed
  const onPay = () => {
    setIsLoading(true);
    setError(true);

    // We make sure that the credit card details are filled
    if (Object.keys(card).length === 0) {
      setIsLoading(false);
      setError(true)
      console.log("Please fill in a valid credit card");

      // we make sure the user have entered their name and show a message
      if (name == ""){
        seterrorMessage("Please enter your name")
      }else {
        seterrorMessage("Please fill in a valid credit card")
      }
      return;

    } else {
      dispatch(updateBookingInProgress(true));
      // Set it to false once you save it in Firestore...
      if(!parkingsSlotsFull){
        console.log(`Parking slots available`)
        bookTheParking(parkingSlot)
      }else {
        console.log(`Parking slots Full`)
      }
    }
  };

  const bookTheParking = async (parkingSlot) => {
    console.log(`Random Parking ${parkingSlot}`)
    console.log(`Random ID ${uuid.v4()}`)
    
    // we will add a reservation for each of slots in the chosen range.
    // If only 1 slot is chosen then our timeSlotPickedArray will be of size 1 

    timeSlotPickedArray.map((eachTimeEntryToBook) => {
      firestoreFunctionToBook(eachTimeEntryToBook, parkingSlot)
    })
  } 

  // Generating unique id for the booking and saving it as the document name 
  // and also saving the data in the document. 
  // We are storing the booking in database under the correct parking lot reservation collection
  const firestoreFunctionToBook = async (eachTimeEntryToBook, parkingSlot) =>{
    var uuidForParking = uuid.v4()
      await setDoc(doc(db, `reservations-${parkingSlotsuID}`, uuidForParking), {
        parkingSlot: parkingSlot,
        parkingLot: parkingSlotsuID,
        timeInt: eachTimeEntryToBook.timeInInt,
        timeStamp: eachTimeEntryToBook.timeStampInt,
        timeString: eachTimeEntryToBook.timeSlotInString,
        parkingID: uuidForParking,
        parkingSlotName: parkingSlotName,
        userID: userID,
        userName: name,
        userEmail: userEmail,
        date: eachTimeEntryToBook.date
      });
      // Navigate back to main page.... that is needed of model.. 
      dispatch(updateBookingInProgress(false));
      setPaymentSuccess(true)

  }

  return (
    <SafeArea>
      {isLoading ? (paymentSuccess ? <View></View> : <PaymentProcessing />) :
        <View>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="large">
            <Text>Parking Available</Text>
          </Spacer>
        </Spacer>
        <NameInput
          disabled={bookingInProgress}
          label="Enter Driver's Name"
          value={name}
          onChangeText={(t) => {
            setName(t);
          }}
        />
        
        <Spacer position="top" size="large">
          {name.length > 0 && !bookingInProgress && (
            <CreditCardInputComponent
              name={name}
              onSuccess={setCard}
            />
          )}
        </Spacer>
        <Spacer position="top" size="large"/>
        <TotalHolder>
          <Text variant="hint">{`Total Cost: ${costPerHour} X ${timeSlotPickedArray.length} = ${costPerHour*(timeSlotPickedArray.length)} SAR`}</Text>
          <Text variant="hint">{`Time Duration: ${timeSlotPickedArray.length} hours`}</Text>
          <Text variant="hint">{`Time Slot: ${position1TimeInt}:00 to ${position2TimeInt + 1}:00`}</Text>
        </TotalHolder>
        <Spacer position="top" size="xxl" />
      {error ? <Text variant="error">{errorMessage}</Text> : <View></View>}
      <PayButton
        disabled={isLoading}
        mode="contained"
        onPress={onPay}
      >
        {`Book Parking: ${costPerHour*(timeSlotPickedArray.length)} SAR`}
      </PayButton>
        </View>
      }
      {paymentSuccess && <ModalView showModel={true} navigation= {navigation}></ModalView>}
    </SafeArea>
  );
};
