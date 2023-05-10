// Simple card component used to display the current parking lot on top of the 
// booking page

import React from "react";
import { View } from "react-native";

import { Text } from "../../../components/typography/text.component";

import {
  ParkingCard,
  ParkingCardCover,
  Info,
} from "./parking-info-card.styles";

export const ParkingInfoCard = ({ parking }) => {
  const {
    name = "Some Parking",
    imageURL = "https://welcomesaudi.com/uploads/0000/1/2021/07/23/84-khobar-corniche-eastern-province.jpg",
  } = parking;

  return (
    <ParkingCard elevation={5}>
      <View>
        <ParkingCardCover key={name} source={{ uri: imageURL }} />
      </View>
      <Info>
        <Text variant="body">{name}</Text>
      </Info>
    </ParkingCard>
  );
};
