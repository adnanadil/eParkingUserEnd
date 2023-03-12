import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { theme } from "./src/infrastructure/theme/index";
import store from "./src/redux/store";
import { Provider } from "react-redux";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { ThemeProvider } from "styled-components";
// import { TabNavigation } from "./src/infrastructure/navigation/tab.navigation";
import { RootNavigation } from "./src/infrastructure/navigation/index.navigation";

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {/* <TabNavigation></TabNavigation> */}
        <RootNavigation></RootNavigation>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
