import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { Button, Card, IconButton, Text, useTheme } from "react-native-paper";

import { MenuItemT } from "@/lib/types/menu";
import { cn } from "@/lib/utils/className";

const extractPrices = (price: string) => {
  const parts = price.split("|").map((part) => part.trim());
  return {
    priceOne: parts[0],
    priceTwo: parts.length > 1 ? parts[1] : null,
  };
};

const extractDescription = (description: string) => {
  const parts = description
    ? description.split("|").map((part) => part.trim())
    : "";
  return {
    variantOne: parts[0],
    variantTwo: parts.length > 1 ? parts[1] : null,
  };
};

const MenuCard = ({
  item,
  onPress,
}: {
  item: MenuItemT;
  onPress: () => void;
}) => {
  const theme = useTheme();
  const { priceOne, priceTwo } = extractPrices(item.attributes.price);
  const { variantOne, variantTwo } = extractDescription(
    item.attributes.description,
  );

  return (
    <Card
      style={{
        backgroundColor: theme.colors.elevation.level5,
      }}
      onPress={onPress}
      className="h-24 w-full">
      <Card.Content className="flex h-full flex-col items-center justify-center py-0">
        <View className="flex w-full flex-row items-center justify-between">
          <View className="flex h-full w-auto flex-col items-start justify-center gap-1">
            <Text className="font-vazirmatn-bold text-lg">
              {item.attributes.title}
            </Text>
            {item.attributes.description && (
              <Text
                className="font-vazirmatn-light text-base"
                style={{ color: theme.colors.outline }}>
                {item.attributes.description}
              </Text>
            )}
          </View>
          <View className="flex flex-row items-center justify-center">
            <View
              className={cn(
                "flex items-start justify-center border-2 px-4 py-2",
                priceTwo ? "rounded-2xl px-2 py-1" : "rounded-full",
              )}
              style={{ borderColor: theme.colors.primary }}>
              <View className="flex flex-row">
                <Text className="font-vazirmatn">{priceOne}</Text>
                {priceTwo && (
                  <Text style={{ color: theme.colors.outline }}>
                    {variantTwo}:{" "}
                  </Text>
                )}
              </View>
              {priceTwo && (
                <View className="flex flex-row">
                  <Text className="font-vazirmatn">{priceTwo}</Text>
                  <Text style={{ color: theme.colors.outline }}>
                    {variantOne}:{" "}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default MenuCard;
