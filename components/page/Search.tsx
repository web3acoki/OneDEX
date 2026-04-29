import React from "react"
import { ScrollView, View, type ViewStyle } from "react-native"
import { SearchHeader } from "@/components/panel/header/SearchHeader"
import { OneDexInput } from "@/components/content/general/OneDexInput"
import { MarketItems } from "@/components/panel/items/MarketItems"

type SearchProps = {
  onBack: () => void
}

export default function Search({ onBack }: SearchProps) {
  const [keyword, setKeyword] = React.useState("")
  const isSearching = keyword.trim().length > 0

  const inputWrapStyle: ViewStyle = {
    marginTop: 8,
    marginHorizontal: 24,
    height: 48,
  }

  return <>
    <SearchHeader onBack={onBack} />
    <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
      <View style={inputWrapStyle}>
        <OneDexInput value={keyword} onChangeText={setKeyword} placeholder="Search market" inputMode="text"/>
      </View>
      <MarketItems query={keyword} useAllMarkets={isSearching} />
    </ScrollView>
  </>
}

