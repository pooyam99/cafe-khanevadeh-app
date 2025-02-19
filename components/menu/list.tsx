import React from "react";
import { FlatList, View } from "react-native";
import { ActivityIndicator, Dialog, Text } from "react-native-paper";

import { useMenuItems } from "@/lib/hooks/useMenu";
import { cn } from "@/lib/utils/className";

import EmptySection from "../EmptySection";
import MenuCard from "./card";

const MenuList = () => {
  const { data, error, refetch, isRefetching, isLoading } = useMenuItems();

  if (isLoading) {
    return <ActivityIndicator size="large" className="size-full" />;
  }

  return (
    <View className="size-full gap-2">
      <FlatList
        data={data}
        renderItem={({ item }) => <MenuCard {...item} />}
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
    </View>
  );
};

export default MenuList;
