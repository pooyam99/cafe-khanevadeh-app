import { useState } from "react";
import { Locales } from "@/lib";
import { Alert } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

import fetchUrl from "@/lib/utils/fetchUrl";

const DeleteItemDialog = ({
  id,
  mode,
  visible,
  onDismiss,
  onDelete,
}: {
  id: string;
  mode: "menu" | "coffee" | "misc";
  visible: boolean;
  onDismiss: () => void;
  onDelete: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const url = {
    menu: `/menu-items/${id}`,
    coffee: `/coffee-items/${id}`,
    misc: `/misc-items/${id}`,
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
          <Text>{Locales.t("deleteItem.message")}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button mode="elevated" className="w-20" onPress={onDismiss}>
            {Locales.t("buttons.no")}
          </Button>
          <Button
            loading={loading}
            mode="contained"
            className="w-20"
            onPress={onSubmit}>
            {Locales.t("buttons.yes")}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DeleteItemDialog;
