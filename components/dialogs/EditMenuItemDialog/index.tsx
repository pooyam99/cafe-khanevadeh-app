import React, { useState } from "react";
import { Locales } from "@/lib";
import { View } from "react-native";
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
  const [title, setTitle] = useState(item.attributes.title);
  const [description, setDescription] = useState(item.attributes.description);
  const [price, setPrice] = useState(item.attributes.price);
  const [type, setType] = useState<MenuItemType>(item.attributes.type);
  const [openMenu, setOpenMenu] = useState(false);

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

  const handleSubmit = () => {
    // Handle the submit action here
    console.log({ name: title, description, price, type });
    onDismiss();
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
            className="relative mt-1.5 flex h-[3.75rem] flex-row items-center justify-between rounded-2xl border"
            style={{
              borderColor: theme.colors.outline,
            }}>
            <Text
              className="absolute -top-3 left-2.5 z-0 px-1.5 text-sm"
              style={{ backgroundColor: theme.colors.elevation.level3, color: theme.colors.secondary }}>
              {Locales.t("menuItemAttributes.type.title")}
            </Text>
            <Text className="px-4">
              {Locales.t(`menuItemAttributes.type.${item.attributes.type}`)}
            </Text>
            <Menu
              visible={openMenu}
              onDismiss={() => setOpenMenu(false)}
              anchorPosition="bottom"
              anchor={
                <IconButton onPress={() => setOpenMenu(true)} icon={"pencil"} />
              }>
              <RadioButton.Group
                onValueChange={(value) => setType(value as MenuItemType)}
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
          <Button onPress={handleSubmit}>{Locales.t("buttons.submit")}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default EditMenuItemDialog;
