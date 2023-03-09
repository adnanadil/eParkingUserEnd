import React from "react";
import { Button, List } from "react-native-paper";
import { SafeArea } from "../../../Utility/SafeArea";

import styled from "styled-components/native";

const YourParkingItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;

export const MoveButton = styled(Button).attrs({
  color: "black",
})`
  padding: ${(props) => props.theme.space[2]};
`;

export const YourParkingScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <List.Section>
        <YourParkingItem
          title="Mall of Dahran"
          description="Parking Slop:P1 - 3PM"
          left={(props) => <List.Icon {...props} color="black" icon="car" />}
          onPress={() => navigation.navigate("QR Code")}
        />
        <YourParkingItem
          title="Dammam Airport"
          description="Parking Slop:Z13 - 8AM"
          left={(props) => <List.Icon {...props} color="black" icon="car" />}
          onPress={() => navigation.navigate("QR Code")}
        />
      </List.Section>
    </SafeArea>
  );
};
