import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity, View, type ViewStyle } from "react-native"
import { MarketItem } from "@/components/content/MarketItem"
import { OneDexText } from "@/components/content/OneDexText"
import { subscribeTop20Markets, type MarketQuote } from "@/services/hyperliquid"
import { setSelectedMarketSymbol } from "@/services/trade/selectedMarketStore"

type MarketsProps = {
  symbolFilter?: string[]
  cardMarginTop?: number
  watchlistHeaderRightAction?: () => void
}

export function Markets({
  symbolFilter,
  cardMarginTop = 24,
  watchlistHeaderRightAction,
}: MarketsProps) {
  const [markets, setMarkets] = React.useState<MarketQuote[]>([])

  React.useEffect(() => {
    const unsubscribe = subscribeTop20Markets(
      (nextMarkets: MarketQuote[]) => {
        setMarkets(nextMarkets)
      },
      () => {}
    )
    return unsubscribe
  }, [])

  const cardStyle: ViewStyle = {
    marginTop: cardMarginTop,
    marginHorizontal: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  }

  const filteredMarkets = symbolFilter?.length
    ? markets.filter((item) => symbolFilter.includes(item.symbol))
    : markets

  const watchlistHeaderStyle: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 6,
  }

  const watchlistLeftGroupStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: 112.28,
    height: 27.99,
  }

  return <>
    <View style={cardStyle}>
      {!!watchlistHeaderRightAction && (
        <View style={watchlistHeaderStyle}>
          <View style={watchlistLeftGroupStyle}>
            <Ionicons name="star" size={20} color="#0F172B" />
            <OneDexText text="Watchlist" fontSize={18} fontWeight="700" color="#0F172B" lineHeight={28} />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={watchlistHeaderRightAction}
          >
            <Ionicons
              name="chevron-up"
              size={20}
              color="#0F172B"
              style={{ transform: [{ rotate: "90deg" }] }}
            />
          </TouchableOpacity>
        </View>
      )}
      {filteredMarkets.map((item) => (
        <TouchableOpacity key={item.symbol} activeOpacity={0.8} onPress={() => setSelectedMarketSymbol(item.symbol)}>
          <MarketItem item={item} />
        </TouchableOpacity>
      ))}
    </View>
  </>
}