import React, { useMemo, useState } from "react";
import { Locales } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryObserverResult } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { Alert } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import * as z from "zod";

import { MiscItemT } from "@/lib/types/menu";
import fetchUrl from "@/lib/utils/fetchUrl";

// Define the schema for form validation
const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable().optional(),
  price: z.string().min(1, "Price is required"),
});

type FormData = z.infer<typeof schema>;

const EditMiscItemDialog = ({
  mode,
  item,
  visible,
  onDismiss,
  refetch,
}: {
  mode: "coffee" | "misc";
  item: MiscItemT;
  visible: boolean;
  onDismiss: () => void;
  refetch: () => Promise<QueryObserverResult<any[], Error>>;
}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const url = {
    coffee: `/coffee-items/${item.id}`,
    misc: `/misc-items/${item.id}`,
  }[mode];

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: item.attributes.title,
      description: item.attributes.description,
      price: item.attributes.price,
    },
  });

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
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      refetch();
      onDismiss();
    } catch (error: any) {
      Alert.alert("Error submitting changes", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{Locales.t("edit")}</Dialog.Title>
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
          <Button mode="contained" className="w-20" onPress={onDismiss}>
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
  );
};

export default EditMiscItemDialog;
