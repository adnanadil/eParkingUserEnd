// This is the file which is run as soon as you open the app, so what we will do is that 
// we will define a root navigation component from react navigation here which will navigate us to
// the screen that we want to navigate to... 

// Here we are importing the needed files and libraries which we will use this component
// to run the code after it is downloaded from the github repo there is a need to install the 
// node packages using the npm i command.

import { theme } from "./src/infrastructure/theme/index";
import store from "./src/redux/store";
import { Provider } from "react-redux";

// Importing fonts from Google fonts
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

// importing our custom theme for the project and the RootNavigation, the RootNavigation 
// helps us to show the appropriate screen based on the user login in status
import { ThemeProvider } from "styled-components";
import { RootNavigation } from "./src/infrastructure/navigation/index.navigation";

// This is the main functional definition of our app component, the app component is the main component
// more like the  starting point of your Application
export default function App() {

  // We define the fonts that we will be using in the application this is done from 
  // line 25 to 35 
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  // Here we can see that we are defining the root which is the starting point of the application
  // we are wrapping the redux store across the application to provide access to the redux store to 
  // all the components of the application and then we are wrapping the theme, the theme is used to have 
  // consistent padding and color throughout the application. 
  // Finally we can see that we have included the RootNavigation as the main element that will be shown when the
  // application opens. So once the application open we show the RootNavigation and hence we develop the next logic of 
  // the application in the RootNavigation. 
  
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RootNavigation></RootNavigation>
      </ThemeProvider>
    </Provider>
  );

  // Note: We have the components folders and its files in order to have consistent theme across the app
  // in terms of the animation, the spacing between items and the kind of text we use.
  // While the theme under is provided with basic colors, fonts and other details and it can be found under the 
  // infrastructure folder. 
}

