// This is the screen which is show by the login.navigation if the user is not logged in
// the screen has links to two other screens which are the sign in or register screen 
// Using the stack navigation defined in login.navigation the users will be able to 
// navigate the either the login or register screen depending on the screen clicked by them.

import React from "react";
import LottieView from "lottie-react-native";

// Here we are importing the spacer element in order to add a few spaces in the UI
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  LoginBackground,
  LoginContainer,
  LoginCover,
  AuthButton,
  Title,
  AnimationWrapper,
} from "../components/login.styles";
import { Text } from "../../../components/typography/text.component";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { signInErrorAction, signUpErrorAction } from "../../../redux/firebaseAuth.slice";

// Here we define and export the screen 
export const LoginOrRegisterScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(signInErrorAction(""))
      dispatch(signUpErrorAction(""))
    }, [])
  );

  // It is a simple screen which has the animation at the top below which are the buttons to move to the needed page.
  // We are using styled components hence we are defining these elements as styled components in under a the login.styles.js 
  // file and we are importing them and using them as component here. 
  return (
    <LoginBackground>
      <LoginCover />
      <AnimationWrapper>
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../../assets/man.json")}
        />
      </AnimationWrapper>
      <Title>eParking</Title>
      <LoginContainer>
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => navigation.navigate("Login")}
        >
          <Text variant="loginScreenButtonText">Login</Text>
        </AuthButton>
        <Spacer  size="large">
          <AuthButton
            icon="email"
            mode="contained"
            onPress={() => navigation.navigate("Register")}
          >
             <Text variant="loginScreenButtonText">Register</Text>
          </AuthButton>
        </Spacer>
      </LoginContainer>
    </LoginBackground>
  );
};
