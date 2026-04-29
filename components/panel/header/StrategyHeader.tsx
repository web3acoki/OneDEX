import React from "react"
import { View, type ViewStyle } from "react-native"
import { OneDexText } from "@/components/content/general/OneDexText"
import { HeaderButton } from "@/components/content/general/HeaderButton"

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
      <HeaderButton name="flash" color="#FE9A00" />
    </View>
  </>
}

