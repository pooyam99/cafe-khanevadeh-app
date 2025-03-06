import React from "react";
import { Locales, Setting, TabBar, TabsHeader } from "@/lib";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Localization from "expo-localization";
import { Tabs } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Platform, useColorScheme } from "react-native";

import AddMenuItemDialog from "@/components/dialogs/AddMenuItemDialog";
import AddMiscItemDialog from "@/components/dialogs/AddMiscItemDialog";
import SearchBar from "@/components/SearchBar";

const TabLayout = () => {
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

        setSettings(JSON.parse(result ?? JSON.stringify(settings)));
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

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        header: (props) => <TabsHeader navProps={props} children={undefined} />,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: Locales.t("tabs.menu"),
          headerRight: () => (
            <>
              <SearchBar />
              <AddMenuItemDialog />
            </>
          ),
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              {...props}
              size={24}
              name={
                props.focused
                  ? "book-open-page-variant"
                  : "book-open-page-variant-outline"
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="coffee"
        options={{
          title: Locales.t("tabs.coffee"),
          headerRight: () => (
            <>
              <SearchBar />
              <AddMiscItemDialog mode="coffee" />
            </>
          ),
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              {...props}
              size={24}
              name={props.focused ? "coffee" : "coffee-outline"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="misc"
        options={{
          title: Locales.t("tabs.misc"),
          headerRight: () => (
            <>
              <SearchBar />
              <AddMiscItemDialog mode="misc" />
            </>
          ),
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              {...props}
              size={24}
              name={
                props.focused
                  ? "bottle-soda-classic"
                  : "bottle-soda-classic-outline"
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: Locales.t("tabs.settings"),
          // headerRight: () => (
          //   <Tooltip title={Locales.t('drawerNav')}>
          //     <Appbar.Action
          //       icon="gesture-swipe"
          //       onPress={() => router.push('/drawer')}
          //     />
          //   </Tooltip>
          // ),
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              {...props}
              size={24}
              name={props.focused ? "cog" : "cog-outline"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
