import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, type ViewStyle } from "react-native";

export function HomeHeader() {
  const headerStyle: ViewStyle = {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 104,
  };

  const avatarStyle: ViewStyle = {
    position: "absolute",
    left: 16,
    top: 49,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E2E8F0",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  };

  const searchButtonStyle: ViewStyle = {
    position: "absolute",
    right: 16,
    top: 48,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <View style={headerStyle}>
      <View style={avatarStyle} />
      <TouchableOpacity style={searchButtonStyle} activeOpacity={0.8}>
        <Ionicons name="search" size={20} color="#62748E" />
      </TouchableOpacity>
    </View>
  );
}