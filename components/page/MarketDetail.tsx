import React from "react"
import { ScrollView, type ViewStyle } from "react-native"
import { MarketDetailHeader } from "@/components/panel/MarketDetailHeader"
import { Markets } from "@/components/panel/Markets"

type MarketDetailProps = {
  symbol: string
  onBack: () => void
}

export default function MarketDetail({ symbol, onBack }: MarketDetailProps) {
  const contentStyle: ViewStyle = {
    paddingBottom: 16,
  }

  return <>
    <MarketDetailHeader symbol={symbol} onBack={onBack} />
    <ScrollView contentContainerStyle={contentStyle}>
      <Markets symbolFilter={[symbol]} />
    </ScrollView>
  </>
}

