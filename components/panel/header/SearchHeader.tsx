import React from "react"
import { View, type ViewStyle } from "react-native"
import { OneDexText } from "@/components/content/general/OneDexText"
import { HeaderButton } from "@/components/content/general/HeaderButton"

type SearchHeaderProps = {
  onBack: () => void
}

export function SearchHeader({ onBack }: SearchHeaderProps) {
  const headerStyle: ViewStyle = {
    height: 104,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 48,
  }

  const leftGroupStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  }

  const titleWrapStyle: ViewStyle = {
    height: 36,
    justifyContent: "center",
  }

  return <>
    <View style={headerStyle}>
      <View style={leftGroupStyle}>
        <HeaderButton name="chevron-back" onPress={onBack} />
        <View style={titleWrapStyle}>
          <OneDexText text="Search" fontSize={24} lineHeight={32} />
        </View>
      </View>
    </View>
  </>
}

