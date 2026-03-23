import React from "react";
import { ScrollView, type ViewStyle } from "react-native";
import { Cards } from "@/components/panel/Cards";
import { TradeHeader } from "@/components/panel/TradeHeader";
import { CategoryBar, type ActiveCategory } from "@/components/panel/CategoryBar";
import { useWatchlistSymbols } from "@/hooks/useWatchlistSymbols";
import { getTradeCategory, setTradeCategory, subscribeTradeCategory, type TradeCategory } from "@/services/trade/tradeCategoryStore";

type TradeProps = {
  onPressSearch: () => void
}

export default function Trade({ onPressSearch }: TradeProps) {
  const watchlistSymbols = useWatchlistSymbols();
  const [mainTab, setMainTab] = React.useState<"Markets" | "Positions">("Markets");
  const [active, setActive] = React.useState<ActiveCategory>(getTradeCategory() as ActiveCategory);

  React.useEffect(() => {
    return subscribeTradeCategory((next: TradeCategory) => {
      setActive(next as ActiveCategory)
    })
  }, [])

  return <>
    <TradeHeader
      onPressSearch={onPressSearch}
      active={mainTab}
      onPressMarkets={() => setMainTab("Markets")}
      onPressPositions={() => setMainTab("Positions")}
    />
    <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
      {mainTab === "Markets" ? <CategoryBar active={active} onChange={(next) => setTradeCategory(next as TradeCategory)} /> : null}
      {mainTab === "Positions"
        ? <Cards mode="positions" />
        : <Cards symbolFilter={active === "Watchlist" ? watchlistSymbols : undefined} />}
    </ScrollView>
  </>
}


