// Instead of defining the safe area in all the screens we define it once here and use 
// it in all the screen leveraging the power of React which helps to reuse components

import { StatusBar, SafeAreaView } from "react-native";
import styled from "styled-components/native";

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;
