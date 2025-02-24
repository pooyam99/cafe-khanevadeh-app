import React from "react";
import { Locales, Setting, StackHeader, Themes } from "@/lib";
import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavLightTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as Localization from "expo-localization";
import { SplashScreen, Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { Alert, I18nManager, Platform, useColorScheme } from "react-native";
import { adaptNavigationTheme, PaperProvider } from "react-native-paper";

import "./global.css";

import ClientProviders from "@/providers/ClientProvider";

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from "expo-router";

// Ensure that reloading on `/modal` keeps a back button present.
export const unstable_settings = { initialRouteName: "(tabs)" };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    "Vazirmatn-Black": require("../assets/fonts/Vazirmatn-FD-Black.ttf"),
    "Vazirmatn-Bold": require("../assets/fonts/Vazirmatn-FD-Bold.ttf"),
    "Vazirmatn-ExtraBold": require("../assets/fonts/Vazirmatn-FD-ExtraBold.ttf"),
    "Vazirmatn-ExtraLight": require("../assets/fonts/Vazirmatn-FD-ExtraLight.ttf"),
    "Vazirmatn-Light": require("../assets/fonts/Vazirmatn-FD-Light.ttf"),
    "Vazirmatn-Medium": require("../assets/fonts/Vazirmatn-FD-Medium.ttf"),
    "Vazirmatn-Regular": require("../assets/fonts/Vazirmatn-FD-Regular.ttf"),
    "Vazirmatn-SemiBold": require("../assets/fonts/Vazirmatn-FD-SemiBold.ttf"),
    "Vazirmatn-Thin": require("../assets/fonts/Vazirmatn-FD-Thin.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  React.useEffect(() => {
    if (error) throw error;
  }, [error]);

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
};

const RootLayoutNav = () => {
  const colorScheme = useColorScheme();
  const [settings, setSettings] = React.useState<Setting>({
    theme: "dark",
    color: "cafe",
    language: "fa",
  });

  // Load settings from the device
  React.useEffect(() => {
    if (Platform.OS !== "web") {
      SecureStore.getItemAsync("settings").then((result) => {
        if (result === null) {
          SecureStore.setItemAsync("settings", JSON.stringify(settings)).then(
            (res) => console.log(res),
          );
        }

        const parsedSettings = JSON.parse(result ?? JSON.stringify(settings));
        setSettings(parsedSettings);

        // Set up RTL
        const isRTL =
          parsedSettings.language === "ar" || parsedSettings.language === "fa";
        if (I18nManager.isRTL !== isRTL) {
          I18nManager.allowRTL(true)
          I18nManager.forceRTL(true);
          I18nManager.swapLeftAndRightInRTL(true);
          // You might need to reload the app here for changes to take effect
          // Alert.alert('isRTL', I18nManager..toString());
        }
      });
    } else {
      setSettings({ ...settings, theme: colorScheme ?? "light" });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (settings.language === "auto") {
      Locales.locale = Localization.getLocales()[1].languageCode ?? "fa";
    } else {
      Locales.locale = settings.language;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme =
    Themes[
      settings.theme === "auto" ? (colorScheme ?? "dark") : settings.theme
    ][settings.color];

  const { DarkTheme, LightTheme } = adaptNavigationTheme({
    reactNavigationDark: NavDarkTheme,
    reactNavigationLight: NavLightTheme,
    materialDark: Themes.dark[settings.color],
    materialLight: Themes.light[settings.color],
  });

  return (
    <ThemeProvider
      value={
        colorScheme === "light"
          ? { ...LightTheme, fonts: NavLightTheme.fonts }
          : { ...DarkTheme, fonts: NavDarkTheme.fonts }
      }>
      <PaperProvider theme={theme}>
        <ClientProviders>
          <Stack
            screenOptions={{
              animation: "slide_from_bottom",
              header: (props) => (
                <StackHeader navProps={props} children={undefined} />
              ),
            }}>
            {/* <Stack.Screen name="(auth)" options={{ headerShown: false }} /> */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            {/* <Stack.Screen name="drawer" options={{ headerShown: false }} /> */}
            {/* <Stack.Screen
            name="search"
            options={{ title: Locales.t('search') }}
          /> */}
            {/* <Stack.Screen
            name="modal"
            options={{ title: Locales.t('titleModal'), presentation: 'modal' }}
          /> */}
          </Stack>
          <StatusBar style="auto" />
        </ClientProviders>
      </PaperProvider>
    </ThemeProvider>
  );
};

export default RootLayout;
