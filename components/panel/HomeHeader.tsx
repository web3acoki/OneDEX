import React from "react";
import { View, type ViewStyle } from "react-native";
import { HeaderButton } from "@/components/content/HeaderButton";
import { showLoginScreen } from "@/services/auth/authScreenStore";

type HomeHeaderProps = {
  onPressSearch: () => void
}

export function HomeHeader({ onPressSearch }: HomeHeaderProps) {
  const headerStyle: ViewStyle = {
    height: 104,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 48,
  };

  return <>
    <View style={headerStyle}>
      <HeaderButton name="person" onPress={showLoginScreen} />
      <HeaderButton name="search" onPress={onPressSearch} />
    </View>
  </>
}