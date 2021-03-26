import React, { useEffect, useState } from "react";
import { View, LogBox } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import AppLoading from "expo-app-loading";
import { useFonts } from "@expo-google-fonts/roboto";

import {
  DefaultTheme,
  configureFonts,
  Provider as PaperProvider,
} from "react-native-paper";

import MainStack from "./src/navigation/MainStack";
import AuthProvider from "./src/contexts/Auth";
import NoConnection from "./src/screens/NoConnection";
import DismissKeyboard from "./src/shared/DismissKeyboard";
import { globalStyles, colors, fontConfig, customFonts } from "./src/constants";

LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
  },
  fonts: configureFonts(fontConfig),
};

function App() {
  const [isConnected, setIsConnected] = useState(true);
  const [isInternetReachable, setisInternetReachable] = useState(true);

  const [fontsLoaded] = useFonts(customFonts);

  useEffect(() => {
    // check user's internet connection status
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      setisInternetReachable(state.isInternetReachable);
    });

    return () => unsubscribe();
  }, [setIsConnected, setisInternetReachable]);

  return isConnected && isInternetReachable ? (
    fontsLoaded ? (
      <AuthProvider>
        <PaperProvider theme={theme}>
          <DismissKeyboard>
            <View style={globalStyles.container}>
              <MainStack />
            </View>
          </DismissKeyboard>
        </PaperProvider>
      </AuthProvider>
    ) : (
      <AppLoading />
    )
  ) : (
    <NoConnection />
  );
}

export default App;
