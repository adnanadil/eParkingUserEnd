import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { LoginOrRegisterScreen } from "../../screens/account/screens/loginOrRegister.screen";
import { LoginScreen } from "../../screens/account/screens/login.screen";
import { RegisterScreen } from "../../screens/account/screens/register.screen";

const Stack = createStackNavigator();

export const LoginInNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Main" component={LoginOrRegisterScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);
