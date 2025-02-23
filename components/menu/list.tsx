import { useState } from "react";
import { setItem } from "expo-secure-store";
import { FlatList, View } from "react-native";
import { ActivityIndicator, Dialog, Text } from "react-native-paper";

import { useMenuItems } from "@/lib/hooks/useMenu";
import { MenuItemT } from "@/lib/types/menu";
import { cn } from "@/lib/utils/className";

import EditMenuItemDialog from "../dialogs/EditMenuItemDialog";
import EmptySection from "../EmptySection";
import MenuCard from "./card";

const MenuList = () => {
  const { data, error, refetch, isRefetching, isLoading } = useMenuItems();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItemT | null>(null);

  if (isLoading) {
    return <ActivityIndicator size="large" className="size-full" />;
  }

  return (
    <View className="size-full gap-2">
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <MenuCard
            item={item}
            onPress={() => {
              setDialogVisible(true);
              setSelectedItem(item);
            }}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => (
          <View className="h-2 w-full bg-transparent" />
        )}
        refreshing={isRefetching}
        onRefresh={refetch}
        ListEmptyComponent={<EmptySection error={error} />}
        contentContainerClassName={cn(
          "py-3 px-2",
          (!data || data.length === 0) &&
            "size-full flex flex-col justify-center items-center",
        )}
      />

      {selectedItem && (
        <EditMenuItemDialog
          item={selectedItem}
          visible={dialogVisible}
          onDismiss={() => {
            setDialogVisible(false);
            setSelectedItem(null);
          }}
        />
      )}
    </View>
  );
};

export default MenuList;
