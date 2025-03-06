import React from "react";
import { styles } from "@/lib";
import { Surface } from "react-native-paper";

import { useCoffeeItems } from "@/lib/hooks/useCoffee";
import MenuList from "@/components/menu/list";

const Coffee = () => {
  const query = useCoffeeItems();

  return (
    <Surface style={styles.screen}>
      <MenuList mode="coffee" query={query} />
    </Surface>
  );
};

export default Coffee;
