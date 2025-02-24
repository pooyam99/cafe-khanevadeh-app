import React from "react";
import { styles } from "@/lib";
import { Surface } from "react-native-paper";

import MenuList from "@/components/menu/list";
import { useMiscItems } from "@/lib/hooks/useMisc";

const Misc = () => {
  const query = useMiscItems();

  return (
    <Surface style={styles.screen}>
      <MenuList mode="misc" query={query} />
    </Surface>
  );
};

export default Misc;
