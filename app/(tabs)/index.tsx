import React from "react";
import { styles } from "@/lib";
import { Surface } from "react-native-paper";

import { useMenuItems } from "@/lib/hooks/useMenu";
import MenuList from "@/components/menu/list";

const Menu = () => {
  const query = useMenuItems();

  return (
    <Surface style={styles.screen}>
      <MenuList query={query} />
    </Surface>
  );
};

export default Menu;
