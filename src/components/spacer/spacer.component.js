// TO have consistency across in terms of the padding that we have across the app we make use
// of a component called the spacer component which is nothing but a view element with specific size
// since this is an empty view it will help in creating space between two items when imported

// Like a normal react component import the needed files and libraries
// Theme is a library that we have used in the App.js it was seen that wrapped the main app with
// theme hence we are able to access the theme defined under the infrastructure from anywhere.
import React from "react";
import styled, { useTheme } from "styled-components/native";

// Various spacer sizes that we want ot use
const sizeVariant = {
  small: 1,
  medium: 2,
  large: 3,
  xl: 4,
  xxl: 5,
};

// How do we want the margin to
const positionVariant = {
  top: "marginTop",
  left: "marginLeft",
  right: "marginRight",
  bottom: "marginBottom",
};

// Function used internally by the component to get the type of spacer that we need to send
// that is the size and the position based on the props that have been sent to call the spacer
// we know that in react we can define a component once and call it as many times as possible
// and each time we give the component different props to have different properties.
const getVariant = (position, size, theme) => {
  const sizeIndex = sizeVariant[size];
  const property = positionVariant[position];
  const value = theme.space[sizeIndex];

  return `${property}:${value}`;
};

// We are defining the spacer view using the styled components it is away of styling the components
// and items instead of using StyleSheet which is common method used to style in React Native. we are using
// styled components as it makes it easy to code and it makes it easy to reuse the components in several places of the
// application.
const SpacerView = styled.View`
  ${({ variant }) => variant};
`;

// This the main function of the spacer and as we can see we return the styled component SpacerView
// which is styled View based on the props sent. we can see in the line below that we are sent
// position, size, children as the props
export const Spacer = ({ position, size, children }) => {
  const theme = useTheme();
  const variant = getVariant(position, size, theme);
  return <SpacerView variant={variant}>{children}</SpacerView>;
};

// If no props are sent we then use these setting as default for the Spacer component. 
Spacer.defaultProps = {
  position: "top",
  size: "small",
};
