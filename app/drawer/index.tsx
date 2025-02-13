import React from "react";
import { Locales, ScreenInfo, styles } from "@/lib";
import { Surface } from "react-native-paper";

const DrawerHome = () => (
  <Surface style={styles.screen}>
    <ScreenInfo title={Locales.t("titleHome")} path="app/drawer/index.tsx" />
  </Surface>
);

export default DrawerHome;
