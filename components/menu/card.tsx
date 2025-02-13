import React from "react";
import { Text, View } from "react-native";

import { MenuItemT } from "@/lib/types/menu";

const MenuCard = (item: MenuItemT) => {
  return (
    <View
      style={{
        direction: "rtl",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: `${100}%`,
        height: 70,
        paddingHorizontal: 12,
        backgroundColor: "#0f0d0a",
        borderRadius: 15,
      }}>
      <View
        style={{
          width: "auto",
          height: `${100}%`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}>
        <Text style={{ color: "white", fontSize: 24 }}>{item.title}</Text>
        <Text style={{ color: "white", fontSize: 16 }}>{item.description}</Text>
      </View>
      <Text
        style={{
          color: "white",
          borderColor: "#dfa839",
          borderWidth: 2,
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 25,
        }}>
        {item.price}
      </Text>
    </View>
  );
};

export default MenuCard;
