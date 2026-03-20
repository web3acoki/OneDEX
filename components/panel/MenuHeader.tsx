import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity, View, type ViewStyle } from "react-native"

type MenuHeaderProps = {
  onBack: () => void
}

const iconButtonStyle: ViewStyle = {
  width: 36,
  height: 36,
  borderRadius: 18,
  backgroundColor: "#FFFFFF",
  alignItems: "center",
  justifyContent: "center",
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 2,
}

export function MenuHeader({ onBack }: MenuHeaderProps) {
  const headerStyle: ViewStyle = {
    height: 104,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 48,
  }

  const rightSpacerStyle: ViewStyle = {
    width: 36,
    height: 36,
  }

  return <>
    <View style={headerStyle}>
      <TouchableOpacity style={iconButtonStyle} activeOpacity={0.8} onPress={onBack}>
        <Ionicons
          name="chevron-up"
          size={20}
          color="#62748E"
          style={{ transform: [{ rotate: "270deg" }] }}
        />
      </TouchableOpacity>
      <View style={rightSpacerStyle} />
    </View>
  </>
}

