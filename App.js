import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./styles";
import { Appearance, AppearanceProvider } from "react-native-appearance";
import { ApolloProvider } from "@apollo/client";
import client, {
  getTokenToStorage,
  isLoggedInVar,
  tokenVar,
  cache,
} from "./apollo";
import TabNav from "./navigators/TabNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageWrapper, persistCache } from "apollo3-cache-persist";

export default function App() {
  const [loading, setLoading] = useState(true);
  const theme = Appearance.getColorScheme();

  const onFinish = () => setLoading(false);

  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imageToLoad = [require("./assets/icon.png")];
    const imagePromises = imageToLoad.map((image) => Asset.loadAsync(image));

    return Promise.all([...fontPromises, ...imagePromises]);
  };

  const preload = async () => {
    const token = await getTokenToStorage();
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }

    await persistCache({
      cache,
      storage: new AsyncStorageWrapper(AsyncStorage),
    });

    return preloadAssets();
  };

  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onFinish={onFinish}
        onError={console.warn}
      />
    );
  }

  return (
    <AppearanceProvider>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <ApolloProvider client={client}>
          <NavigationContainer>
            <TabNav />
          </NavigationContainer>
        </ApolloProvider>
      </ThemeProvider>
    </AppearanceProvider>
  );
}
