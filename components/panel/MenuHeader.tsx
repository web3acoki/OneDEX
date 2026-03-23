import React from "react"
import { View, type ViewStyle } from "react-native"
import { HeaderButton } from "@/components/content/HeaderButton"

type MenuHeaderProps = {
  onBack: () => void
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
      <HeaderButton name="chevron-back" onPress={onBack} />
      <View style={rightSpacerStyle} />
    </View>
  </>
}

