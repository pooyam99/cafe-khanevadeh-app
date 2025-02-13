import React from "react";
import { Locales, TabBar, TabsHeader } from "@/lib";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { Appbar, Tooltip } from "react-native-paper";

const TabLayout = () => {
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
