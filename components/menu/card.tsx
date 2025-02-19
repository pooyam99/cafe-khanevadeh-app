import React from "react";
import { Text, View } from "react-native";

import { MenuItemT } from "@/lib/types/menu";
import { Dialog } from "react-native-paper";

const MenuCard = (item: MenuItemT) => {
  return (
    <View className="flex h-20 w-full flex-row items-center justify-between rounded-2xl bg-[#0f0d0a] px-4">
      <View className="flex h-full w-auto flex-col items-start justify-center gap-1">
        <Text className="font-vazirmatn-bold text-lg text-white">
          {item.attributes.title}
        </Text>
        <Text className="font-vazirmatn-light text-base text-white">
          {item.attributes.description}
        </Text>
      </View>
      <View className="flex items-center justify-center rounded-full border-2 border-[#dfa839] px-3 py-1">
        <Text className="font-vazirmatn text-white">
          {item.attributes.price}
        </Text>
      </View>
    </View>
  );
};

export default MenuCard;
