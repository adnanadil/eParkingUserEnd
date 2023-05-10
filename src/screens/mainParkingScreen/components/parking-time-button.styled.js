// Styled buttons which we will use in other components

import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";


export const TimeSlotButtonSelected = styled(TouchableOpacity)`
  width: 100;
  height: 50;
  margin-right: 10;
  margin-top: 10;
  background-color: ${(props) => props.theme.colors.brand.primary};
  border-radius: 10;
  align-items: center;
  justify-content: center;
`;

export const TimeSlotButtonUnselected = styled(TouchableOpacity)`
  width: 100;
  height: 50;
  margin-right: 10;
  margin-top: 10;
  background-color: ${(props) => props.theme.colors.ui.secondary};
  border-radius: 10;
  align-items: center;
  justify-content: center;
`;