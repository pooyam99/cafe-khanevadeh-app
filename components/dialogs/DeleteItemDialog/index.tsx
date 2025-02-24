import { useState } from "react";
import { Locales } from "@/lib";
import { Alert } from "react-native";
import { Button, Dialog, Portal, Text, useTheme } from "react-native-paper";

import { MenuItemT, MiscItemT } from "@/lib/types/menu";
import fetchUrl from "@/lib/utils/fetchUrl";

const DeleteItemDialog = ({
  mode,
  item,
  visible,
  onDismiss,
  onDelete,
}: {
  mode: "menu" | "coffee" | "misc";
  item: MenuItemT | MiscItemT;
  visible: boolean;
  onDismiss: () => void;
  onDelete: () => void;
}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const url = {
    menu: `/menu-items/${item.id}`,
    coffee: `/coffee-items/${item.id}`,
    misc: `/misc-items/${item.id}`,
  }[mode];

  const onSubmit = async () => {
    setLoading(true);
    try {
      await fetchUrl(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      onDelete();
    } catch (error: any) {
      Alert.alert("Error submitting changes", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{Locales.t("deleteItem.title")}</Dialog.Title>
        <Dialog.Content className="gap-2">
          <Text>
            {Locales.t("deleteItem.message", { name: item.attributes.title })}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button mode="elevated" className="w-20" onPress={onDismiss}>
            {Locales.t("buttons.no")}
          </Button>
          <Button
            loading={loading}
            className="w-20"
            mode="contained"
            onPress={onSubmit}>
            {Locales.t("buttons.yes")}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DeleteItemDialog;
