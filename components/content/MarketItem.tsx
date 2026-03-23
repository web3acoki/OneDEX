import React from "react"
import { View, type ViewStyle } from "react-native"
import { OneDexText } from "@/components/content/OneDexText"
import { type MarketQuote } from "@/services/hyperliquid"

type MarketItemProps = {
  item: MarketQuote
}

const FULL_NAMES: Record<string, string> = {
  USDC: "USD Coin",
  USDT: "Tether",
  ETH: "Ethereum",
}

export function getMarketFullName(symbol: string): string {
  return FULL_NAMES[symbol] ?? `${symbol} perpetual`
}

function formatUsd(price: string) {
  const n = Number(price)
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function MarketItem({ item }: MarketItemProps) {
  const avatarLetter = item.symbol.slice(0, 1).toUpperCase()
  const title = item.symbol
  const subtitle = getMarketFullName(item.symbol)
  const priceText = formatUsd(item.price)
  const secondaryText = `${item.changePct >= 0 ? "+" : ""}${item.changePct.toFixed(2)}%`
  const secondaryColor = item.changePct >= 0 ? "#00BC7D" : "#EF4444"

  const rowStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 72,
    paddingHorizontal: 16,
  }

  const leftRowStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  }

  const avatarStyle: ViewStyle = {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  }

  const labelsColStyle: ViewStyle = {
    flex: 1,
    justifyContent: "center",
  }

  const subtitleWrapStyle: ViewStyle = {
    marginTop: 2,
  }

  const rightColStyle: ViewStyle = {
    alignItems: "flex-end",
    justifyContent: "center",
  }

  const changeWrapStyle: ViewStyle = {
    marginTop: 2,
  }

  return <>
    <View style={rowStyle}>
      <View style={leftRowStyle}>
        <View style={avatarStyle}>
          <OneDexText text={avatarLetter} fontSize={16} color="#0F172B" />
        </View>
        <View style={labelsColStyle}>
          <OneDexText text={title} fontSize={16} lineHeight={24} />
          <View style={subtitleWrapStyle}>
            <OneDexText text={subtitle} fontSize={12} fontWeight="500" color="#90A1B9" lineHeight={16} />
          </View>
        </View>
      </View>
      <View style={rightColStyle}>
        <OneDexText text={priceText} fontSize={16} lineHeight={24} />
        <View style={changeWrapStyle}>
          <OneDexText text={secondaryText} fontSize={12} color={secondaryColor} lineHeight={16} />
        </View>
      </View>
    </View>
  </>
}

