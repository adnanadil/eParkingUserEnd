import styled from "styled-components/native";
import { Card } from "react-native-paper";

export const ParkingCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const ParkingCardCover = styled(Card.Cover)`
  padding: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const Info = styled.View`
  padding: ${(props) => props.theme.space[2]};
`;
