import React from "react"
import { ScrollView, type ViewStyle } from "react-native"
import { MarketHeader } from "@/components/panel/MarketHeader"
import { Cards } from "@/components/panel/Cards"

type MarketProps = {
  symbol: string
  onBack: () => void
  onPressSearch: () => void
}

export default function Market({ symbol, onBack, onPressSearch }: MarketProps) {
  const contentStyle: ViewStyle = {
    paddingBottom: 16,
  }

  return <>
    <MarketHeader symbol={symbol} onBack={onBack} onPressSearch={onPressSearch} />
    <ScrollView contentContainerStyle={contentStyle}>
      <Cards symbolFilter={[symbol]} />
    </ScrollView>
  </>
}

