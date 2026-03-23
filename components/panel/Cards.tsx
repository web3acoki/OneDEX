import React from "react"
import { useEmbeddedEthereumWallet } from "@privy-io/expo"
import { Pressable, View, type ViewStyle } from "react-native"
import { BalanceItem } from "@/components/content/BalanceItem"
import { getMarketFullName, MarketItem } from "@/components/content/MarketItem"
import { PositionItem } from "@/components/content/PositionItem"
import { fetchPositionItems, fetchSpotBalances, getMarketQuotes, getPositionItems, getSpotBalances, subscribeAllMarkets, subscribeTop20Markets, type MarketQuote } from "@/services/hyperliquid"
import { setSelectedMarketSymbol } from "@/services/trade/selectedMarketStore"

type CardsProps = {
  symbolFilter?: string[]
  query?: string
  useAllMarkets?: boolean
  cardMarginTop?: number
  mode?: "markets" | "balances" | "positions"
}

type BalanceRow = {
  symbol: string
  totalBalanceValue: string
  availableBalanceValue: string
  usdcValueValue: string
  pnlValue: string
  pnlColor: string
}

function getCoinPrice(coin: string, quotes: MarketQuote[]): number {
  if (coin === "USDC" || coin === "USDT") return 1
  const quote = quotes.find((item) => item.symbol === coin)
  return Number(quote?.price ?? "0")
}

function formatUsd(value: number): string {
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function formatTotal(value: number): string {
  return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 6 })
}

function getCoinChangePct(coin: string, quotes: MarketQuote[]): number {
  if (coin === "USDC" || coin === "USDT") return 0
  const quote = quotes.find((item) => item.symbol === coin)
  return quote?.changePct ?? 0
}

export function Cards({
  symbolFilter,
  query,
  useAllMarkets = false,
  cardMarginTop = 24,
  mode = "markets",
}: CardsProps) {
  const { wallets } = useEmbeddedEthereumWallet()
  const walletAddress = wallets[0]?.address ?? ""
  const needsAllMarkets = mode !== "markets" || useAllMarkets
  const [markets, setMarkets] = React.useState<MarketQuote[]>(() => getMarketQuotes())
  const [balances, setBalances] = React.useState(() => getSpotBalances(walletAddress))
  const [positions, setPositions] = React.useState(() => getPositionItems(walletAddress))

  React.useEffect(() => {
    const subscribe = needsAllMarkets ? subscribeAllMarkets : subscribeTop20Markets
    const unsubscribe = subscribe(
      (nextMarkets: MarketQuote[]) => {
        setMarkets(nextMarkets)
      },
      () => {}
    )
    return unsubscribe
  }, [needsAllMarkets])

  React.useEffect(() => {
    if (mode !== "balances" || !walletAddress) return
    void fetchSpotBalances(walletAddress).then((next) => setBalances(next))
  }, [mode, walletAddress])

  React.useEffect(() => {
    if (mode !== "positions" || !walletAddress) return
    void fetchPositionItems(walletAddress).then((next) => setPositions(next))
  }, [mode, walletAddress])

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

  const normalizedQuery = (query ?? "").trim().toLowerCase()

  const filteredBySymbol = symbolFilter?.length
    ? markets.filter((item) => symbolFilter.includes(item.symbol))
    : markets

  const matchedMarkets = normalizedQuery
    ? filteredBySymbol.filter((item) => {
        const symbol = item.symbol.toLowerCase()
        const fullName = getMarketFullName(item.symbol).toLowerCase()
        return symbol.includes(normalizedQuery) || fullName.includes(normalizedQuery)
      })
    : filteredBySymbol

  const filteredMarkets = !normalizedQuery && !useAllMarkets
    ? matchedMarkets.slice(0, 20)
    : matchedMarkets

  const balanceRows: BalanceRow[] = balances.map((item) => {
    const total = Number(item.total)
    const hold = Number(item.hold)
    const available = total - hold
    const coinPrice = getCoinPrice(item.coin, markets)
    const usdcValue = total * coinPrice
    const changePct = getCoinChangePct(item.coin, markets)
    const pnlValue = usdcValue * (changePct / 100)
    const pnlSign = pnlValue >= 0 ? "+" : "-"
    const roeSign = changePct >= 0 ? "+" : "-"

    return {
      symbol: item.coin,
      totalBalanceValue: formatTotal(total),
      availableBalanceValue: formatTotal(available),
      usdcValueValue: formatUsd(usdcValue),
      pnlValue: `${pnlSign}$${Math.abs(pnlValue).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${roeSign}${Math.abs(changePct).toFixed(2)}%)`,
      pnlColor: pnlValue >= 0 ? "#00BC7D" : "#EF4444",
    }
  })

  if (mode === "positions" && positions.length === 0) return null
  if (mode === "balances" && balanceRows.length === 0) return null
  if (mode === "markets" && filteredMarkets.length === 0) return null

  return <>
    <View style={cardStyle}>
      {mode === "positions"
        ? positions.map((item) => <PositionItem key={`${item.symbol}-${item.entryPriceText}`} item={item} />)
        : mode === "balances"
        ? balanceRows.map((item) => <BalanceItem key={item.symbol} item={item} />)
        : filteredMarkets.map((item) => (
          <Pressable key={item.symbol} onPress={() => setSelectedMarketSymbol(item.symbol)}>
            <MarketItem item={item} />
          </Pressable>
        ))}
    </View>
  </>
}

