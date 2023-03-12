import React from "react";
import styled from "styled-components/native";
import { SafeArea } from "../../../Utility/SafeArea";

import { List, Avatar } from "react-native-paper";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";

import { signOut } from "firebase/auth";
import { auth } from "../../../Utility/firebase.utils";
import { useDispatch, useSelector } from "react-redux";
import { userSignedInAction } from "../../../redux/firebaseAuth.slice";

const AccountItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;
const AvatarContainer = styled.View`
  align-items: center;
`;


export const MainAccountsScreen = ({ navigation }) => {

  const dispatch = useDispatch()

  const userEmail = useSelector((state) => state.firebaseAuthSlice.userEmail)

  const onLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sign Out succeess");
        dispatch(userSignedInAction(false));
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <SafeArea>
      <AvatarContainer>
        <Avatar.Icon size={180} icon="human" backgroundColor="#FF9986" />
        <Spacer position="top" size="large">
          <Text variant="label">{userEmail}</Text>
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
          onPress={onLogout}
        />
      </List.Section>
    </SafeArea>
  );
};
