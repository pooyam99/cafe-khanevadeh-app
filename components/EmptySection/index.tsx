import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

const EmptySection = ({
  error,
  noResult,
}: {
  error?: boolean;
  noResult: boolean;
}) => {
  const theme = useTheme();

  return (
    <View className="flex size-full flex-col items-center justify-center">
      {!!error ? (
        <View className="flex flex-col items-center" style={{ gap: 16 }}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            color={theme.colors.error}
            size={120}
          />
          <Text className="text-2xl">خطا در دریافت اطلاعات</Text>
        </View>
      ) : (
        <View className="flex flex-col items-center" style={{ gap: 16 }}>
          <MaterialCommunityIcons
            name="clipboard-search-outline"
            color={theme.colors.error}
            size={120}
          />
          <Text className="text-2xl">
            {noResult ? "محصول مورد نظر یافت نشد" : "فهرست خالی است"}
          </Text>
        </View>
      )}
    </View>
  );
};

export default EmptySection;
