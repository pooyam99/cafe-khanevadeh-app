import { useState } from "react";
import { LoadingIndicator } from "@/lib";
import { UseQueryResult } from "@tanstack/react-query";
import { FlatList, View } from "react-native";

import { CoffeeItemT, MenuItemT, MiscItemT } from "@/lib/types/menu";
import { cn } from "@/lib/utils/className";

import EditMenuItemDialog from "../dialogs/EditMenuItemDialog";
import EmptySection from "../EmptySection";
import MenuCard from "../menu/card";

interface MistListProps<T> {
  query: UseQueryResult<T[], Error>;
}

const MistList = <T extends CoffeeItemT>({ query }: MistListProps<T>) => {
  const { data, error, refetch, isRefetching, isLoading } = query;
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View className="size-full gap-2">
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <MenuCard
            item={item}
            onEdit={() => {
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
          refetch={refetch}
          onDismiss={() => {
            setDialogVisible(false);
            setSelectedItem(null);
          }}
        />
      )}
    </View>
  );
};

export default MistList;
