import React, { useState, useContext } from "react";

import { ActivityIndicator, Colors } from "react-native-paper";


import {colors} from "../../../infrastructure/theme/colors"

import {
  LoginBackground,
  LoginCover,
  LoginContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
} from "../components/login.styles";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
// import { AuthenticationContext } from "../../../services/authentication/authentication.context";

import { auth } from "../../../Utility/firebase.utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  userSignedInAction,
  signUpProgressAction,
  signUpErrorAction,
} from "../../../redux/firebaseAuth.slice";


export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  // const { onRegister, isLoading, error } = useContext(AuthenticationContext);

  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.firebaseAuthSlice.signUpProgress)
  const error = useSelector((state) => state.firebaseAuthSlice.signUpError);


  const onRegister = (email, password, repeatedPassword) => {
    if (password !== repeatedPassword) {
      dispatch(signUpErrorAction("Error: Passwords do not match"))
      return;
    }
    dispatch(signUpProgressAction(true))
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      dispatch(userSignedInAction(true));
      dispatch(signUpProgressAction(false))
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      dispatch(signUpProgressAction(false))
      dispatch(signUpErrorAction(errorMessage))
      // ..
    });
  }

  return (
    <LoginBackground>
      <LoginCover />
      <Title>eParking</Title>
      <LoginContainer>
        <AuthInput
          label="E-mail"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(u) => setEmail(u)}
        />
        <Spacer size="large">
          <AuthInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => setPassword(p)}
          />
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label="Repeat Password"
            value={repeatedPassword}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => setRepeatedPassword(p)}
          />
        </Spacer>
        {error && (
          <ErrorContainer size="large">
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}
        <Spacer size="large">
          {!isLoading ? (
            <AuthButton
              icon="email"
              mode="contained"
              onPress={() => onRegister(email, password, repeatedPassword)}
            >
              Register
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={colors.brand.primary} />
          )}
        </Spacer>
      </LoginContainer>
      <Spacer size="large">
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton>
      </Spacer>
    </LoginBackground>
  );
};
