// Again instead of defining the properties of each text used in the app we have a
// common place where all the test styled as defined and whenever we want to give a property to
// any text we can choose one of these properties this makes it super easy to edit the styles if we
// need to anytime while coding.

// This is again a component, that is each text is a component which has different styles like
// size, font, color etc.

// We import the styled-components/native library as the text will be styled using styled-components
import styled from "styled-components/native";

// By default the Text component will have these properties
const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

// From line 24 to 81 we have defined various styles of text that we will use across the app
// it can be seen that they have different sizes, alignments, colors and other properties.

const title = (theme) => `
    font-size: ${theme.fontSizes.title};
`;
const alert = (theme) => `
    font-size: ${theme.fontSizes.title};
    text-align: center;
`;

const body = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const hint = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const error = (theme) => `
    color: ${theme.colors.text.error};
`;

const caption = (theme) => `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.bold};
`;

const label = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.medium};
`;

const timeButtonText = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.medium};
    color: ${theme.colors.bg.primary};
`;

const hourValueButton = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.h4};
    font-weight: ${theme.fontWeights.medium};
    color: ${theme.colors.bg.primary};
`;

const loginScreenButtonText = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.label};
    font-weight: ${theme.fontWeights.bold};
    color: ${theme.colors.bg.primary};
`;

const del = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.title};
    font-weight: ${theme.fontWeights.bold};
    color: ${theme.colors.text.error};
`;

// The various forms of Text to
const variants = {
  title,
  body,
  label,
  caption,
  error,
  hint,
  timeButtonText,
  hourValueButton,
  loginScreenButtonText,
  alert,
  del,
};

// This is the main function of the Text Component which is used to define the type of text
// to get a text from the component we just send it details of the kind of text that we need
// the component will produce a text view with those properties and we can display it in our app
// preventing the use to style the Text every time.
export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

// This is the default text exported if no props are sent to define the kind of Text needed
// It is like a back up to prevent the crashing of the app and to make sure that we render
// some text when this component is used in any part of the application.
Text.defaultProps = {
  variant: "body",
};
