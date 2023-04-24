import React from "react";
import LottieView from "lottie-react-native";

import { Spacer } from "../../../components/spacer/spacer.component";
import { colors } from "../../../infrastructure/theme/colors";
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
import { signInErrorAction } from "../../../redux/firebaseAuth.slice";

export const LoginOrRegisterScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(signInErrorAction(""))
    }, [])
  );

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
