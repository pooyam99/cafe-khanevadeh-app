import React from "react";
import { FlashList } from "@shopify/flash-list";
import { FlatList, View } from "react-native";

import MenuCard from "./card";
import { MenuItemData } from "./dummyData";

const MenuList = () => {
  return (
    <View>
      <FlatList
        data={MenuItemData}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 3, paddingHorizontal: 4 }}>
            <MenuCard {...item} />
          </View>
        )}
        // estimatedItemSize={50}
      />
    </View>
  );
};

export default MenuList;
