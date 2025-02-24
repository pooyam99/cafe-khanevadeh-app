import React from "react";
import { styles } from "@/lib";
import { Surface } from "react-native-paper";

import MenuList from "@/components/menu/list";
import { useCoffeeItems } from "@/lib/hooks/useCoffee";

const Coffee = () => {
  const query = useCoffeeItems();

  return (
    <Surface style={styles.screen}>
      <MenuList mode="coffee" query={query} />
    </Surface>
  );
};

export default Coffee;
