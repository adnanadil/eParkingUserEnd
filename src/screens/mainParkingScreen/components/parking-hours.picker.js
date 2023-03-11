import React from "react";
import styled from "styled-components/native";

import { colors } from "../../../infrastructure/theme/colors";
import { TouchableOpacity } from "react-native";
import { Text } from "../../../components/typography/text.component";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useDispatch, useSelector } from "react-redux";
import {
  decreaseHours,
  increseHours,
  updateSearchCompleted,
} from "../../../redux/parkingSlice";

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

  const hoursSelected = useSelector(
    (state) => state.parkingSlice.hoursSelected
  );
  const dispatch = useDispatch();

  return (
    <Holder>
      <ValueButton
        disabled={bookingInProgress}
        onPress={() => dispatch(decreaseHours())}
      >
        <Text variant="hourValueButton">-</Text>
      </ValueButton>
      <Text variant="title">{hoursSelected}</Text>
      <ValueButton
        onPress={() => dispatch(increseHours())}
        disabled={bookingInProgress}
      >
        <Text variant="hourValueButton">+</Text>
      </ValueButton>
      <SearchButton
        onPress={() => dispatch(updateSearchCompleted(true))}
        disabled={bookingInProgress}
      >
        <Ionicons name="md-search" size={32} color="white" />
      </SearchButton>
    </Holder>
  );
};
