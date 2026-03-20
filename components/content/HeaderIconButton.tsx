import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity, type ViewStyle } from "react-native"

type HeaderIconButtonProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"]
  color: string
  size?: number
  onPress?: () => void
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

export function HeaderIconButton({ icon, color, size = 20, onPress }: HeaderIconButtonProps) {
  return <TouchableOpacity style={iconButtonStyle} activeOpacity={0.8} onPress={onPress}>
    <Ionicons name={icon} size={size} color={color} />
  </TouchableOpacity>
}

