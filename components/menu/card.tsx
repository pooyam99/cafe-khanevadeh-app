import { useState } from "react";
import { Locales } from "@/lib";
import { View } from "react-native";
import { Card, Menu, Text, useTheme } from "react-native-paper";

import { MenuItemT, MiscItemT } from "@/lib/types/menu";
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

const MenuCard = <T extends MenuItemT | MiscItemT>({
  item,
  onEdit,
  onDelete,
}: {
  item: T;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const theme = useTheme();
  const [openMenu, setOpenMenu] = useState(false);
  const { priceOne, priceTwo } = extractPrices(item.attributes.price);
  const { variantOne, variantTwo } = extractDescription(
    item.attributes.description,
  );

  return (
    <Menu
      visible={openMenu}
      onDismiss={() => setOpenMenu(false)}
      anchorPosition="bottom"
      anchor={
        <Card
          style={{
            backgroundColor: theme.colors.elevation.level5,
          }}
          onPress={() => setOpenMenu(true)}
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
                    "flex items-start justify-center border-2 px-4 py-1",
                    priceTwo ? "rounded-2xl px-2 py-1" : "rounded-full",
                  )}
                  style={{ borderColor: theme.colors.primary }}>
                  <View className="flex flex-row">
                    {priceTwo && (
                      <Text style={{ color: theme.colors.outline }}>
                        {variantTwo}:{" "}
                      </Text>
                    )}
                    <Text className="font-vazirmatn">{priceOne}</Text>
                  </View>
                  {priceTwo && (
                    <View className="flex flex-row">
                      <Text style={{ color: theme.colors.outline }}>
                        {variantOne}:{" "}
                      </Text>
                      <Text className="font-vazirmatn">{priceTwo}</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>
      }>
      <Menu.Item
        leadingIcon={"pencil"}
        title={Locales.t("edit")}
        onPress={() => {
          setOpenMenu(false);
          onEdit();
        }}
      />
      <Menu.Item
        leadingIcon={"trash-can"}
        title={Locales.t("delete")}
        onPress={() => {
          setOpenMenu(false);
          onDelete();
        }}
      />
    </Menu>
  );
};

export default MenuCard;
