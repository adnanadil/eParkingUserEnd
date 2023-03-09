import React from "react";
import styled from "styled-components/native";
import { SafeArea } from "../../../Utility/SafeArea";

import { List, Avatar } from "react-native-paper";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";

const AccountItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;
const AvatarContainer = styled.View`
  align-items: center;
`;

export const MainAccountsScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <AvatarContainer>
        <Avatar.Icon size={180} icon="human" backgroundColor="#FF9986" />
        <Spacer position="top" size="large">
          <Text variant="label">Adnan</Text>
        </Spacer>
      </AvatarContainer>
      <List.Section>
        <AccountItem
          title="Your Parkings"
          description="View all your reservations"
          left={(props) => <List.Icon {...props} color="black" icon="road" />}
          onPress={() => navigation.navigate("Your Parkings")}
        />
        <AccountItem
          title="Logout"
          left={(props) => <List.Icon {...props} color="black" icon="door" />}
        //   onPress={onLogout}
        />
      </List.Section>
    </SafeArea>
  );
};
