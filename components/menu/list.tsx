import React from "react";
import { FlashList } from "@shopify/flash-list";
import { FlatList, View } from "react-native";

import MenuCard from "./card";
import { MenuItemData } from "./dummyData";

const MenuList = () => {
  return (
    <View className="size-full gap-2">
      <FlatList
        data={MenuItemData}
        renderItem={({ item }) => <MenuCard {...item} />}
        ItemSeparatorComponent={() => <View className="w-full h-2 bg-transparent" />}
        // estimatedItemSize={50}
        refreshing={false}
        onRefresh={() => null}
      />
    </View>
  );
};

export default MenuList;
