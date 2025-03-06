import { useMemo, useState } from "react";
import { LoadingIndicator } from "@/lib";
import { UseQueryResult } from "@tanstack/react-query";
import { FlatList, View } from "react-native";

import { useSearch } from "@/lib/context/SearchContext";
import { MenuItemT, MiscItemT } from "@/lib/types/menu";
import { cn } from "@/lib/utils/className";

import DeleteItemDialog from "../dialogs/DeleteItemDialog";
import EditMenuItemDialog from "../dialogs/EditMenuItemDialog";
import EditMiscItemDialog from "../dialogs/EditMiscItemDialog";
import EmptySection from "../EmptySection";
import MenuCard from "./card";

interface MenuListProps<T> {
  mode: T extends MenuItemT ? "menu" : "coffee" | "misc";
  query: UseQueryResult<T[], Error>;
}

const MenuList = <T extends MenuItemT | MiscItemT>({
  mode,
  query,
}: MenuListProps<T>) => {
  const { data, isError, refetch, isRefetching, isLoading } = query;
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const { searchQuery } = useSearch();

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!query.data || !searchQuery) {
      return query.data;
    }

    return query.data.filter((item) =>
      item.attributes.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [query.data, searchQuery]);

  // Check if we have no search results
  const hasNoSearchResults =
    !!searchQuery && filteredItems?.length === 0 && !query.isLoading;

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View className="size-full gap-2">
      <FlatList
        data={filteredItems}
        renderItem={({ item }) => (
          <MenuCard
            item={item}
            onEdit={() => {
              setSelectedItem(item);
              setEditDialogVisible(true);
            }}
            onDelete={() => {
              setSelectedItem(item);
              setDeleteDialogVisible(true);
            }}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => (
          <View className="h-2 w-full bg-transparent" />
        )}
        refreshing={isRefetching}
        onRefresh={refetch}
        ListEmptyComponent={
          <EmptySection error={isError} noResult={hasNoSearchResults} />
        }
        contentContainerClassName={cn(
          "py-3 px-2",
          (!data || data.length === 0) &&
            "size-full flex flex-col justify-center items-center",
        )}
      />

      {selectedItem &&
        (mode === "menu" ? (
          <EditMenuItemDialog
            item={selectedItem as MenuItemT}
            visible={editDialogVisible}
            refetch={refetch}
            onDismiss={() => {
              setEditDialogVisible(false);
              setSelectedItem(null);
            }}
          />
        ) : (
          <EditMiscItemDialog
            mode={mode}
            item={selectedItem as MiscItemT}
            visible={editDialogVisible}
            refetch={refetch}
            onDismiss={() => {
              setEditDialogVisible(false);
              setSelectedItem(null);
            }}
          />
        ))}
      {selectedItem && (
        <DeleteItemDialog
          item={selectedItem}
          mode={mode}
          visible={deleteDialogVisible}
          onDismiss={() => {
            setSelectedItem(null);
            setDeleteDialogVisible(false);
          }}
          onDelete={() => {
            setDeleteDialogVisible(false);
            refetch();
          }}
        />
      )}
    </View>
  );
};

export default MenuList;
