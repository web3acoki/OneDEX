import React from "react"
import { useEmbeddedEthereumWallet } from "@privy-io/expo"
import { BalanceItem } from "@/components/content/item/BalanceItem"
import { fetchSpotBalances, getMarketQuotes, getSpotBalances, subscribeAllMarkets, type MarketQuote } from "@/services/hyperliquid"

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

function getCoinChangePct(coin: string, quotes: MarketQuote[]): number {
  if (coin === "USDC" || coin === "USDT") return 0
  const quote = quotes.find((item) => item.symbol === coin)
  return quote?.changePct ?? 0
}

function formatUsd(value: number): string {
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function formatTotal(value: number): string {
  return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 6 })
}

export function BalanceItems() {
  const { wallets } = useEmbeddedEthereumWallet()
  const walletAddress = wallets[0]?.address ?? ""
  const [balances, setBalances] = React.useState(() => getSpotBalances(walletAddress))
  const [markets, setMarkets] = React.useState<MarketQuote[]>(() => getMarketQuotes())

  React.useEffect(() => {
    if (!walletAddress) return
    void fetchSpotBalances(walletAddress).then((next) => setBalances(next))
  }, [walletAddress])

  React.useEffect(() => {
    const unsubscribe = subscribeAllMarkets((nextMarkets) => setMarkets(nextMarkets), () => {})
    return unsubscribe
  }, [])

  const rows: BalanceRow[] = balances.map((item) => {
    const total = Number(item.total)
    const hold = Number(item.hold)
    const available = total - hold
    const usdcValue = total * getCoinPrice(item.coin, markets)
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

  if (!rows.length) return null

  return <>
    {rows.map((item, index) => <BalanceItem key={item.symbol} item={item} isFirst={index === 0} />)}
  </>
}

