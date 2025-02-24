import React, { useMemo, useState } from "react";
import { Locales } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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
import * as z from "zod";

import { useMenuItems } from "@/lib/hooks/useMenu";
import { MenuItemType } from "@/lib/types/menu";
import fetchUrl from "@/lib/utils/fetchUrl";

// Define the schema for form validation
const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable().optional(),
  price: z.string().min(1, "Price is required"),
  type: z.enum(["coffee", "chocolate", "food", "drink"]).default("coffee"),
});

type FormData = z.infer<typeof schema>;

const AddMenuItemDialog = () => {
  const theme = useTheme();
  const { refetch } = useMenuItems();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      type: "coffee",
    },
  });

  const onDismiss = () => {
    setVisible(false);
    reset();
  };

  const inputTheme = useMemo(
    () => ({
      colors: {
        background: theme.colors.elevation.level3,
      },
    }),
    [theme.colors.elevation.level3],
  );

  const menuItemTypes: MenuItemType[] = useMemo(
    () => ["coffee", "chocolate", "food", "drink"],
    [],
  );

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await fetchUrl(`/menu-items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      refetch();
      setVisible(false);
    } catch (error: any) {
      Alert.alert("Error submitting changes", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <IconButton icon="plus" onPress={() => setVisible(true)} />
      <Portal>
        <Dialog visible={visible} onDismiss={onDismiss}>
          <Dialog.Title>{Locales.t("add")}</Dialog.Title>
          <Dialog.Content className="gap-2">
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label={Locales.t("menuItemAttributes.title")}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  mode="outlined"
                  style={{ backgroundColor: "transparent" }}
                  outlineStyle={{ borderRadius: 12 }}
                  theme={inputTheme}
                  error={!!errors.title}
                />
              )}
              name="title"
            />
            {errors.title && (
              <Text style={{ color: theme.colors.error }}>
                {errors.title.message}
              </Text>
            )}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label={Locales.t("menuItemAttributes.description")}
                  value={value || ""}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  mode="outlined"
                  style={{ backgroundColor: "transparent" }}
                  outlineStyle={{ borderRadius: 12 }}
                  theme={inputTheme}
                  error={!!errors.description}
                />
              )}
              name="description"
            />
            {errors.description && (
              <Text style={{ color: theme.colors.error }}>
                {errors.description.message}
              </Text>
            )}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label={Locales.t("menuItemAttributes.price")}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  mode="outlined"
                  style={{ backgroundColor: "transparent" }}
                  outlineStyle={{ borderRadius: 12 }}
                  className="z-50"
                  theme={inputTheme}
                  error={!!errors.price}
                />
              )}
              name="price"
            />
            {errors.price && (
              <Text style={{ color: theme.colors.error }}>
                {errors.price.message}
              </Text>
            )}

            <Controller
              control={control}
              name="type"
              render={({ field: { onChange, value } }) => (
                <View
                  className="relative mt-1.5 flex h-[3.75rem] flex-row items-center justify-between rounded-[0.85rem] border"
                  style={{
                    borderColor: theme.colors.outline,
                  }}>
                  <Text
                    className="absolute -top-3 left-2.5 z-0 px-1.5 text-sm"
                    style={{
                      backgroundColor: theme.colors.elevation.level3,
                      color: theme.colors.onSurfaceVariant,
                    }}>
                    {Locales.t("menuItemAttributes.type.title")}
                  </Text>
                  <Text className="px-4">
                    {Locales.t(`menuItemAttributes.type.${value}`)}
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
                      onValueChange={(newValue) => {
                        onChange(newValue as MenuItemType);
                        setOpenMenu(false);
                      }}
                      value={value}>
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
              )}
            />
            {errors.type && (
              <Text style={{ color: theme.colors.error }}>
                {errors.type.message}
              </Text>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              mode="elevated"
              className="w-20"
              onPress={onDismiss}>
              {Locales.t("buttons.cancel")}
            </Button>
            <Button
              loading={loading}
              disabled={!isDirty}
              mode="contained"
              className="w-20"
              onPress={handleSubmit(onSubmit)}>
              {Locales.t("buttons.submit")}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default AddMenuItemDialog;
