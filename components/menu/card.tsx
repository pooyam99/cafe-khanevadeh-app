import React from "react";
import { Text, View } from "react-native";

import { MenuItemT } from "@/lib/types/menu";

const MenuCard = (item: MenuItemT) => {
  return (
    <View className="flex h-20 w-full flex-row items-center justify-between rounded-2xl bg-[#0f0d0a] px-3">
      <View className="flex h-full w-auto flex-col items-start justify-center gap-1">
        <Text className="text-lg text-white">{item.title}</Text>
        <Text className="text-base text-white">{item.description}</Text>
      </View>
      <Text className="rounded-full border-2 border-[#dfa839] px-2 py-1 text-white">
        {item.price}
      </Text>
    </View>
  );
};

export default MenuCard;
