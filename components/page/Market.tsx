import React from "react"
import { ScrollView, type ViewStyle } from "react-native"
import { IntervalBar, type MarketIntervalValue } from "@/components/panel/bar/IntervalBar"
import { MarketHeader } from "@/components/panel/header/MarketHeader"
import { Chart } from "@/components/panel/info/Chart"
import { MarketItems } from "@/components/panel/items/MarketItems"
import { fetchCandleSnapshot } from "@/services/hyperliquid"

type MarketProps = {
  symbol: string
  onBack: () => void
  onPressSearch: () => void
}

export default function Market({ symbol, onBack, onPressSearch }: MarketProps) {
  const [points, setPoints] = React.useState<Array<{ timestamp: number; value: number }>>([])
  const [interval, setInterval] = React.useState<MarketIntervalValue>("5m")

  React.useEffect(() => {
    const coin = symbol.replace("-USD", "")
    void fetchCandleSnapshot(coin, interval, 200).then((next) => setPoints(next))
  }, [symbol, interval])

  const contentStyle: ViewStyle = {
    paddingBottom: 16,
  }

  return <>
    <MarketHeader symbol={symbol} onBack={onBack} onPressSearch={onPressSearch} />
    <ScrollView contentContainerStyle={contentStyle}>
      <MarketItems symbolFilter={[symbol]} />
      <IntervalBar active={interval} onChange={setInterval} />
      <Chart symbol={symbol} points={points} />
    </ScrollView>
  </>
}

