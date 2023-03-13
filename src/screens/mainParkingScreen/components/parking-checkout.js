// This is the section that is below the time slot picker

import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../Utility/SafeArea";

import { CreditCardInputComponent } from "../components/credit-card.component";

import {
  CartIconContainer,
  CartIcon,
  NameInput,
  PayButton,
  ClearButton,
  PaymentProcessing,
  TotalHolder,
} from "../components/parking-checkout.styles";
import { updateBookingInProgress } from "../../../redux/parkingSlice";

export const ParkingCheckoutComponent = () => {
  const dispatch = useDispatch();

  const bookingInProgress = useSelector(
    (state) => state.parkingSlice.bookingInProgress
  );
  const [name, setName] = useState("");
  const [card, setCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onPay = () => {
    setIsLoading(true);
    if (Object.keys(card).length === 0) {
      setIsLoading(false);
      //   navigation.navigate("CheckoutError", {
      //     error: "Please fill in a valid credit card",
      //   });
      console.log("Please fill in a valid credit card");
      return;
    } else {
      dispatch(updateBookingInProgress(true));
      // Set it to false once you save it in Firestore... IA
    }
  };

  // We can use this add the loader ...
  //   if (!cart.length || !restaurant) {
  //     return (
  //       <SafeArea>
  //         <CartIconContainer>
  //           <CartIcon icon="cart-off" />
  //           <Text>Your cart is empty!</Text>
  //         </CartIconContainer>
  //       </SafeArea>
  //     );
  //   }

  return (
    <SafeArea>
      {isLoading && <PaymentProcessing />}
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
              //   onError={() =>
              //     navigation.navigate("CheckoutError", {
              //       error: "Something went wrong processing your credit card",
              //     })
              //   }
            />
          )}
        </Spacer>
        <Spacer position="top" size="large"/>
        <TotalHolder>
          <Text variant="hint">Total Cost: 10 SAR</Text>
          <Text variant="hint">Time Duration: 4 hours</Text>
          <Text variant="hint">Time Slot: 3PM to 4PM</Text>
        </TotalHolder>
        <Spacer position="top" size="xxl" />
      <PayButton
        disabled={isLoading}
        // icon="USD"
        mode="contained"
        onPress={onPay}
      >
        Book Parking: 10 SAR
      </PayButton>
    </SafeArea>
  );
};
