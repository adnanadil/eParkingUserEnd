// This is the login page which the user is shown when the press the option to login in the loginOrRegister page
// It is part of the stack navigation used in the login.navigation.js file.

import React, { useState, useContext, useEffect } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";

import {
  signInWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
} from "firebase/auth";

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
import { TouchableOpacity } from "react-native";

// Here is the main function of the component in which we will define the logic of signing into the application
// and we will return the UI to be displayed on the page.

export const LoginScreen = ({ navigation }) => {
  // Using react state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Using the redux state in the component
  const isLoading = useSelector(
    (state) => state.firebaseAuthSlice.signInProgress
  );
  const error = useSelector((state) => state.firebaseAuthSlice.signInError);

  // Defining the dispatch function to call the action to update the redux state that is the state in the store.

  const dispatch = useDispatch();

  // Function called when the login button is pressed.
  // We check if both email and password fields are filled only then we will proceed with login
  // If not we will show the respective error.
  // Firebase automatically throws an error if the email is not of the correct format hence we
  // did not code the logic for the email check here.
  const onLogin = (email, password) => {
    dispatch(signInErrorAction(""));
    if (email !== "" && password !== "") {
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
          console.log(`Hitting this end point`);
        });
    } else {
      if (email === "" && password === "") {
        dispatch(signInErrorAction("Please enter email address and password"));
      } else if (email === "" && password !== "") {
        dispatch(signInErrorAction("Please enter email address"));
      } else if (password === "" && email !== "") {
        dispatch(signInErrorAction("Please enter your password"));
      }
    }
  };

  // When the reset password button is clicked this function is called
  // Again we make sure the user has entered an email in the email field
  // Firebase check for invalid emails and hence again we did not implement this logic in our code
  // to check for the email address structure
  const resetPasswordPressed = () => {
    if (email !== "") {
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          dispatch(signInErrorAction("password reset link sent to email"));
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          dispatch(signInErrorAction(errorMessage));
        });
    } else if (email === "") {
      dispatch(signInErrorAction("Please enter you email address"));
    }
  };

  // Here we can see the elements and the components which are displayed we are making use of the
  // Styled components defined under the login.styles.js file under the components folder as this makes it
  // easy to reuse to components and helps in reducing the length of the code.
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
        <TouchableOpacity onPress={resetPasswordPressed}>
          <Text
            style={{
              textAlignVertical: "center",
              textAlign: "center",
              color: "blue",
            }}
          >
            Reset Password
          </Text>
        </TouchableOpacity>
      </LoginContainer>
      <Spacer size="large">
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton>
      </Spacer>
    </LoginBackground>
  );
};
