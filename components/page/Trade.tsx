import React from "react";
import { ScrollView, type ViewStyle } from "react-native";
import { MarketItems } from "@/components/panel/items/MarketItems";
import { PositionItems } from "@/components/panel/items/PositionItems";
import { TradeHeader } from "@/components/panel/header/TradeHeader";
import { CategoryBar, type ActiveCategory } from "@/components/panel/bar/CategoryBar";
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
        ? <PositionItems />
        : <MarketItems symbolFilter={active === "Watchlist" ? watchlistSymbols : undefined} />}
    </ScrollView>
  </>
}


