import React from "react"
import { View, type ViewStyle } from "react-native"
import { OneDexText } from "@/components/content/OneDexText"
import { HeaderIconButton } from "@/components/content/HeaderIconButton"

export function StrategyHeader() {
  const headerStyle: ViewStyle = {
    height: 104,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 48,
  }

  return <>
    <View style={headerStyle}>
      <OneDexText text="Strategy Center" fontSize={24} fontWeight="700" color="#0F172B" lineHeight={32} />
      <HeaderIconButton icon="flash-outline" size={18} color="#FE9A00" />
    </View>
  </>
}

