import React from "react";
import { Locales, styles } from "@/lib";
import { Link, Stack } from "expo-router";
import { Surface, Text } from "react-native-paper";

const NotFound = () => (
  <Surface style={styles.screen}>
    <Stack.Screen options={{ title: Locales.t("titleNotFound") }} />

    <Text variant="displayLarge">{Locales.t("titleNotFound")}</Text>

    <Text variant="bodyLarge">{Locales.t("screen404")}</Text>

    <Link href="/">
      <Text variant="bodyLarge">{Locales.t("goHome")}</Text>
    </Link>
  </Surface>
);

export default NotFound;
