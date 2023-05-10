// This is a list that shows all the bookings and it is imported in the YourParkingScreen screen

import styled from "styled-components/native";
import { FlatList } from "react-native";

export const BookingList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;
