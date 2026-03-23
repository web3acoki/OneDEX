import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { Pressable, type ViewStyle } from "react-native"

type HeaderButtonProps = {
  name: React.ComponentProps<typeof Ionicons>["name"]
  onPress?: () => void
  color?: string
}

const buttonStyle: ViewStyle = {
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

export function HeaderButton({ name, onPress, color = "#62748E" }: HeaderButtonProps) {
  return <Pressable style={buttonStyle} onPress={onPress}>
    <Ionicons name={name} size={20} color={color} />
  </Pressable>
}

