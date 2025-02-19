import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

const EmptySection = ({ error }: { error?: Error | null }) => {
  return (
    <View className="flex size-full flex-col items-center justify-center">
      {error ? (
        <Text className="text-2xl">خطا در دریافت اطلاعات</Text>
      ) : (
        <Text className="text-2xl">اطلاعات یافت نشد</Text>
      )}
    </View>
  );
};

export default EmptySection;
