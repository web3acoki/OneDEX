import React from "react";
import { View, type ViewStyle } from "react-native";
import { HeaderIconButton } from "@/components/content/HeaderIconButton";

export function HomeHeader() {
  const headerStyle: ViewStyle = {
    height: 104,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 48,
  };

  const avatarStyle: ViewStyle = {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E2E8F0",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  };

  return <>
    <View style={headerStyle}>
      <View style={avatarStyle} />
      <HeaderIconButton icon="search" size={20} color="#62748E" />
    </View>
  </>
}