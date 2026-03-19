import React from "react";
import { View, type ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { OneDexText } from "@/components/content/OneDexText";

export function Brand() {
  const panelStyle: ViewStyle = {
    width: 283.206,
    height: 205.471,
  };

  const gradientColors: [string, string] = ["rgba(255,255,255,0.1)", "rgba(0,0,0,0)"];

  const iconContainerStyle: ViewStyle = {
    position: "absolute",
    left: 93.6,
    top: 0,
    width: 95.991,
    height: 95.991,
    borderRadius: 28,
    backgroundColor: "#000000",
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 8,
  };

  const iconStyle: ViewStyle = {
    position: "absolute",
    left: 27,
    top: 27,
    width: 41.983,
    height: 41.983,
    alignItems: "center",
    justifyContent: "center",
  };

  const headingWrapStyle: ViewStyle = {
    position: "absolute",
    left: 73.42,
    top: 127.99,
    width: 136.357,
    height: 50.993,
  };

  const subheadingWrapStyle: ViewStyle = {
    position: "absolute",
    left: 0,
    top: 182.97,
    width: 283.206,
    height: 22.499,
  };

  return (
    <View style={panelStyle}>
      <View style={iconContainerStyle}>
        <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} />
        <View style={iconStyle}>
          <Ionicons name="flash" size={42} color="#FFFFFF" />
        </View>
      </View>
      <View style={headingWrapStyle}>
        <OneDexText text="OneDEX" fontSize={34} color="#000000" lineHeight={51} />
      </View>
      <View style={subheadingWrapStyle}>
        <OneDexText text="Liquidity aggregated, trades unleashed." fontSize={15} fontWeight="500" color="#90A1B9" lineHeight={22.5} />
      </View>
    </View>
  );
}

