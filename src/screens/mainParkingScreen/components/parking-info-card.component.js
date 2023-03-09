import React from "react";
import { SvgXml } from "react-native-svg";
import { View } from "react-native";

// import { Favourite } from "../../../components/favourites/favourite.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import star from "../../../../assets/star";
import open from "../../../../assets/open";

import {
  ParkingCard,
  ParkingCardCover,
  Info,
  Section,
  SectionEnd,
  Rating,
  Icon,
  Address,
} from "./parking-info-card.styles";

export const ParkingInfoCard = ({ parking = {} }) => {
  const {
    name = "Some Parking",
    photo = "https://welcomesaudi.com/uploads/0000/1/2021/07/23/84-khobar-corniche-eastern-province.jpg",
  } = parking;

  return (
    <ParkingCard elevation={5}>
      <View>
        <ParkingCardCover key={name} source={{ uri: photo }} />
      </View>
      <Info>
        <Text variant="body">{name}</Text>
        {/* <Address>{address}</Address> */}
      </Info>
    </ParkingCard>
  );
};
