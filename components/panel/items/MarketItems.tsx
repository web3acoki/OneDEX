import React from "react"
import { Pressable } from "react-native"
import { getMarketFullName, MarketItem } from "@/components/content/item/MarketItem"
import { getMarketQuotes, subscribeAllMarkets, subscribeTop20Markets, type MarketQuote } from "@/services/hyperliquid"
import { setSelectedMarketSymbol } from "@/services/trade/selectedMarketStore"

type MarketItemsProps = {
  symbolFilter?: string[]
  query?: string
  useAllMarkets?: boolean
}

export function MarketItems({ symbolFilter, query, useAllMarkets = false }: MarketItemsProps) {
  const [markets, setMarkets] = React.useState<MarketQuote[]>(() => getMarketQuotes())

  React.useEffect(() => {
    const subscribe = useAllMarkets ? subscribeAllMarkets : subscribeTop20Markets
    const unsubscribe = subscribe((nextMarkets) => setMarkets(nextMarkets), () => {})
    return unsubscribe
  }, [useAllMarkets])

  const normalizedQuery = (query ?? "").trim().toLowerCase()
  const filteredBySymbol = symbolFilter?.length ? markets.filter((item) => symbolFilter.includes(item.symbol)) : markets
  const matchedMarkets = normalizedQuery
    ? filteredBySymbol.filter((item) => {
        const symbol = item.symbol.toLowerCase()
        const fullName = getMarketFullName(item.symbol).toLowerCase()
        return symbol.includes(normalizedQuery) || fullName.includes(normalizedQuery)
      })
    : filteredBySymbol
  const filteredMarkets = !normalizedQuery && !useAllMarkets ? matchedMarkets.slice(0, 20) : matchedMarkets

  if (!filteredMarkets.length) return null

  return <>
    {filteredMarkets.map((item, index) => (
      <Pressable key={item.symbol} onPress={() => setSelectedMarketSymbol(item.symbol)}>
        <MarketItem item={item} isFirst={index === 0} />
      </Pressable>
    ))}
  </>
}

