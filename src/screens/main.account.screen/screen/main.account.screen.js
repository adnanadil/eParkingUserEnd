// This is the main screen which is shown under the accounts tab and from this we can logout of the application 
// or we can navigate to look at our bookings and from there navigate to generate the QR code for the booking

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

// Defining our styled components locally as we just need a list that will show the items on the page and a view to show 
// our icon
const AccountItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;
const AvatarContainer = styled.View`
  align-items: center;
`;


// This is the main function which will be exported and here we define the account page and 
// the functions that it needs.

export const MainAccountsScreen = ({ navigation }) => {

  const dispatch = useDispatch()

  const userEmail = useSelector((state) => state.firebaseAuthSlice.userEmail)

  // This is the logout function which is called when a user presses the logout option 
  // once the user is logged out the state is updated to show that there is no user logged into
  // the app which causes the main navigation to navigate the user to the login page and no longer
  // show the tab navigation hence preventing access to the user to use the application until they login
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

  // The elements and components of the account page can be seen in the return function 
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
