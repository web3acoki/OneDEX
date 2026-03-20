import React from "react";
import { ScrollView, type ViewStyle } from "react-native";
import { Markets } from "@/components/panel/Markets";
import { TradeHeader } from "@/components/panel/TradeHeader";
import { CategoryBar, type ActiveCategory } from "@/components/panel/CategoryBar";
import { useWatchlistSymbols } from "@/hooks/useWatchlistSymbols";
import { getTradeCategory, setTradeCategory, subscribeTradeCategory, type TradeCategory } from "@/services/trade/tradeCategoryStore";

export default function Trade() {
  const watchlistSymbols = useWatchlistSymbols();
  const [active, setActive] = React.useState<ActiveCategory>(getTradeCategory() as ActiveCategory);

  React.useEffect(() => {
    return subscribeTradeCategory((next: TradeCategory) => {
      setActive(next as ActiveCategory)
    })
  }, [])

  return <>
    <TradeHeader />
    <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
      <CategoryBar active={active} onChange={(next) => setTradeCategory(next as TradeCategory)} />
      <Markets
        symbolFilter={active === "Watchlist" ? watchlistSymbols : undefined}
      />
    </ScrollView>
  </>
}


