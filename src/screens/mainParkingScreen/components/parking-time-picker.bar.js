import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

import { ParkingIndividualTime } from "./parking-time-picker.button";

const ParkingTimePickerWrapper = styled.View`
  padding: 10px;
`;
export const ParkingTimePickerBar = ({ timeSlots }) => {
  if (!timeSlots.length) {
    return null;
  }
  return (
    <ParkingTimePickerWrapper>
      <Spacer variant="left.large">
        <Text variant="title">Available Time Slots</Text>
      </Spacer>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {timeSlots.map((timeSlot) => {
          return (
            <ParkingIndividualTime
              timeSlot = {timeSlot}
              key = {timeSlot}
            />
          );
        })}
      </ScrollView>
    </ParkingTimePickerWrapper>
  );
};
