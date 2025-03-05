import React, { useMemo, useState } from "react";
import { Locales } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Alert, View } from "react-native";
import {
  Button,
  Dialog,
  IconButton,
  Portal,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import * as z from "zod";

import { useMenuItems } from "@/lib/hooks/useMenu";
import fetchUrl from "@/lib/utils/fetchUrl";
import { useMiscItems } from "@/lib/hooks/useMisc";
import { useCoffeeItems } from "@/lib/hooks/useCoffee";

// Define the schema for form validation
const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable().optional(),
  price: z.string().min(1, "Price is required"),
});

type FormData = z.infer<typeof schema>;

const AddMiscItemDialog = ({ mode }: { mode: "coffee" | "misc" }) => {
  const theme = useTheme();
  const { refetch: refetchMisc } = useMiscItems();
  const { refetch: refetchCoffee } = useCoffeeItems();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const url = {
    coffee: `/coffee-items`,
    misc: `/misc-items`,
  }[mode];

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
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

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await fetchUrl(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      mode === "misc" ? refetchMisc() : refetchCoffee();
      onDismiss();
    } catch (error: any) {
      Alert.alert("Error submitting item", error);
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
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode="elevated" className="w-20" onPress={onDismiss}>
              {Locales.t("buttons.cancel")}
            </Button>
            <Button
              loading={loading}
              disabled={!isValid}
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

export default AddMiscItemDialog;
