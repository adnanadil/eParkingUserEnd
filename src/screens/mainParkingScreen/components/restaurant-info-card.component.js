import React from "react";
import { SvgXml } from "react-native-svg";
import { View } from "react-native";

// import { Favourite } from "../../../components/favourites/favourite.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import star from "../../../../assets/star";
import open from "../../../../assets/open";

import {
  RestaurantCard,
  RestaurantCardCover,
  Info,
  Section,
  SectionEnd,
  Rating,
  Icon,
  Address,
} from "./restaurant-info-card.styles";

export const RestaurantInfoCard = ({ restaurant = {} }) => {
  const {
    name = "Some Restaurant",
    photo = "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
  } = restaurant;

  return (
    <RestaurantCard elevation={5}>
      <View>
        {/* <Favourite restaurant={restaurant} /> */}
        <RestaurantCardCover key={name} source={{ uri: photo }} />
      </View>
      <Info>
        <Text variant="body">{name}</Text>
        {/* <Address>{address}</Address> */}
      </Info>
    </RestaurantCard>
  );
};
