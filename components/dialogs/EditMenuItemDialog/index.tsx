import React, { useEffect, useState } from "react";
import { Locales } from "@/lib";
import { Alert, View } from "react-native";
import {
  Button,
  Dialog,
  IconButton,
  Menu,
  Portal,
  RadioButton,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

import { MenuItemT, MenuItemType } from "@/lib/types/menu";
import fetchUrl from "@/lib/utils/fetchUrl";

const EditMenuItemDialog = ({
  item,
  visible,
  onDismiss,
}: {
  item: MenuItemT;
  visible: boolean;
  onDismiss: () => void;
}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(item.attributes.title);
  const [description, setDescription] = useState(item.attributes.description);
  const [price, setPrice] = useState(item.attributes.price);
  const [type, setType] = useState<MenuItemType>(item.attributes.type);
  const [openMenu, setOpenMenu] = useState(false);
  const [data, setData] = useState<Partial<MenuItemT>>({
    attributes: {
      title,
      description,
      price,
      type,
    },
  });

  useEffect(() => {
    setData({
      attributes: {
        title,
        description,
        price,
        type,
      },
    });
  }, [title, description, price, type]);

  const isDirty =
    title !== item.attributes.title ||
    description !== item.attributes.description ||
    price !== item.attributes.price ||
    type !== item.attributes.type;

  const inputTheme = {
    colors: {
      background: theme.colors.elevation.level3,
    },
  };
  const menuItemTypes: MenuItemType[] = [
    "coffee",
    "chocolate",
    "food",
    "drink",
  ];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetchUrl(`/menu-items/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      if (response) {
        Alert.alert("Successfully submitted", response.toString());
        onDismiss();
      }
    } catch (error: any) {
      Alert.alert("Error submitting changes", error);
    }
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>
          {Locales.t("edit")} «{item.attributes.title}»
        </Dialog.Title>
        <Dialog.Content className="gap-2">
          <TextInput
            label={Locales.t("menuItemAttributes.title")}
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            style={{ backgroundColor: "transparent" }}
            outlineStyle={{ borderRadius: 12 }}
            theme={inputTheme}
          />
          <TextInput
            label={Locales.t("menuItemAttributes.description")}
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            style={{ backgroundColor: "transparent" }}
            outlineStyle={{ borderRadius: 12 }}
            theme={inputTheme}
          />
          <TextInput
            label={Locales.t("menuItemAttributes.price")}
            value={price}
            onChangeText={setPrice}
            mode="outlined"
            style={{ backgroundColor: "transparent" }}
            outlineStyle={{ borderRadius: 12 }}
            className="z-50"
            theme={inputTheme}
          />
          <View
            className="relative mt-1.5 flex h-[3.75rem] flex-row items-center justify-between rounded-[0.85rem] border"
            style={{
              borderColor: theme.colors.outline,
            }}>
            <Text
              className="absolute -top-3 left-2.5 z-0 px-1.5 text-sm"
              style={{
                backgroundColor: theme.colors.elevation.level3,
                color: theme.colors.secondary,
              }}>
              {Locales.t("menuItemAttributes.type.title")}
            </Text>
            <Text className="px-4">
              {Locales.t(`menuItemAttributes.type.${type}`)}
            </Text>
            <Menu
              visible={openMenu}
              onDismiss={() => setOpenMenu(false)}
              anchorPosition="bottom"
              anchor={
                <IconButton
                  onPress={() => setOpenMenu(true)}
                  icon={"chevron-down"}
                />
              }>
              <RadioButton.Group
                onValueChange={(value) => {
                  setType(value as MenuItemType);
                  setOpenMenu(false);
                }}
                value={type}>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}>
                  {menuItemTypes.map((menuItemType) => (
                    <RadioButton.Item
                      key={menuItemType}
                      label={Locales.t(
                        `menuItemAttributes.type.${menuItemType}`,
                      )}
                      value={menuItemType}
                    />
                  ))}
                </View>
              </RadioButton.Group>
            </Menu>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>{Locales.t("buttons.cancel")}</Button>
          <Button loading={loading} disabled={!isDirty} onPress={handleSubmit}>
            {Locales.t("buttons.submit")}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default EditMenuItemDialog;
