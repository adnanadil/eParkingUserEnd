// This is the registration page which the user is shown when the press the option to register in the loginOrRegister page
// It is part of the stack navigation used in the login.navigation.js file.

import React, { useState, useContext, useEffect } from "react";

import { ActivityIndicator, Colors } from "react-native-paper";

import { colors } from "../../../infrastructure/theme/colors";

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

import { auth } from "../../../Utility/firebase.utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  userSignedInAction,
  signUpProgressAction,
  signUpErrorAction,
} from "../../../redux/firebaseAuth.slice";

// This is the main function which is exported by the file and it has all the logic and the elements to be displayed
export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state) => state.firebaseAuthSlice.signUpProgress
  );
  const error = useSelector((state) => state.firebaseAuthSlice.signUpError);

  // Function to register the user.
  // Here we check if all the fields are filled and only then use the user is allowed to register
  // The user is also show an error message if the passwords don't match
  // The firebase throws various errors like incorrect email structure and other errors which are printed
  // to guide the users.

  const onRegister = (email, password, repeatedPassword) => {
    dispatch(signUpErrorAction(""));
    if (email !== "" && password !== "" && repeatedPassword !== "") {
      // If passwords don't match we don't allow the user to register the return exits the function
      if (password !== repeatedPassword) {
        dispatch(signUpErrorAction("Error: Passwords do not match"));
        return;
      }
      dispatch(signUpProgressAction(true));
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch(userSignedInAction(true));
          dispatch(signUpProgressAction(false));
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          dispatch(signUpProgressAction(false));
          dispatch(signUpErrorAction(errorMessage));
        });
    } else {
      dispatch(signUpErrorAction("Error: Please enter all the fields"));
    }
  };

  // Again we import the needed components provide the styles we need to given them..
  // we are adding security by hiding the password and for this we are defining the label type to be
  // of the password and the email input field is defined as email to provide the user with an email keyboard
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
        <Spacer position="top" size="large">
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
