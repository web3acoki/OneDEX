import React from "react"
import { View, type ViewStyle } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { OneDexText } from "@/components/content/general/OneDexText"

export function Brand() {
  const wrapStyle: ViewStyle = {
    marginTop: 143.986,
    alignSelf: "center",
    width: 283.206,
    height: 205.471,
  };
  const gradientColors: [string, string] = ["rgba(255,255,255,0.1)", "rgba(0,0,0,0)"];
  const gradientStyle: ViewStyle = {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  };

  const iconContainerStyle: ViewStyle = {
    alignSelf: "center",
    width: 95.991,
    height: 95.991,
    borderRadius: 28,
    backgroundColor: "#0F172B",
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 8,
  };

  const headingWrapStyle: ViewStyle = {
    alignItems: "center",
    marginTop: 32,
  };

  const subheadingWrapStyle: ViewStyle = {
    alignItems: "center",
    marginTop: 4,
  };

  return <>
    <View style={wrapStyle}>
      <View style={iconContainerStyle}>
        <LinearGradient colors={gradientColors} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={gradientStyle}>
          <Ionicons name="flash" size={42} color="#FFFFFF" />
        </LinearGradient>
      </View>

      <View style={headingWrapStyle}>
        <OneDexText text="OneDEX" fontSize={34} lineHeight={51}/>
      </View>

      <View style={subheadingWrapStyle}>
        <OneDexText text="Liquidity aggregated, trades unleashed." fontSize={15} fontWeight="500" color="#90A1B9" lineHeight={22.5}/>
      </View>
    </View>
  </>
}