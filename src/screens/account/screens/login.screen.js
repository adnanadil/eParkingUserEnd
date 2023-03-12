import React, { useState, useContext } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";

import { signInWithEmailAndPassword } from "firebase/auth";

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
import { app, auth } from "../../../Utility/firebase.utils";

import { useDispatch, useSelector } from "react-redux";
import {
  userSignedInAction,
  signInProgressAction,
  signInErrorAction,
} from "../../../redux/firebaseAuth.slice";
import { colors } from "../../../infrastructure/theme/colors";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { onLogin, error, isLoading } = useContext(AuthenticationContext);

  const isLoading = useSelector(
    (state) => state.firebaseAuthSlice.signInProgress
  );
  const error = useSelector((state) => state.firebaseAuthSlice.signInError);

  const dispatch = useDispatch();
  const onLogin = (email, password) => {
    dispatch(signInProgressAction(true));
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch(userSignedInAction(true));
        dispatch(signInProgressAction(false));
        console.log(`Sign in succeess ${user}`);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        dispatch(signInProgressAction(false));
        dispatch(signInErrorAction(errorMessage));
        console.log(`Hitting this end point`)
      });
  };
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
        {error && (
          <ErrorContainer size="large">
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}
        <Spacer size="large">
          {!isLoading ? (
            <AuthButton
              icon="lock-open-outline"
              mode="contained"
              onPress={() => onLogin(email, password)}
            >
              Login
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
