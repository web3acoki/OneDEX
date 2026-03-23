import React from "react"
import { View, type ViewStyle } from "react-native"
import { loadWatchlistSymbols, saveWatchlistSymbols, DEFAULT_WATCHLIST_SYMBOLS } from "@/services/watchlist"
import { HeaderButton } from "@/components/content/HeaderButton"

type MarketHeaderProps = {
  symbol: string
  onBack: () => void
  onPressSearch: () => void
}

export function MarketHeader({ symbol, onBack, onPressSearch }: MarketHeaderProps) {
  const [symbols, setSymbols] = React.useState<string[]>([...DEFAULT_WATCHLIST_SYMBOLS])

  React.useEffect(() => {
    let cancelled = false
    void loadWatchlistSymbols().then((next) => {
      if (cancelled) return
      setSymbols(next)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const isFavorite = symbols.includes(symbol)
  const favoriteColor = isFavorite ? "#0F172B" : "#90A1B9"

  async function toggleFavorite() {
    const next = isFavorite ? symbols.filter((s) => s !== symbol) : [...symbols, symbol]
    await saveWatchlistSymbols(next)
    setSymbols(next)
  }

  const headerStyle: ViewStyle = {
    height: 104,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 48,
  }

  const rightGroupStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  }

  return <>
    <View style={headerStyle}>
      <HeaderButton name="chevron-back" onPress={onBack} />
      <View style={rightGroupStyle}>
        <HeaderButton name="star" color={favoriteColor} onPress={() => void toggleFavorite()} />
        <HeaderButton name="search" onPress={onPressSearch} />
      </View>
    </View>
  </>
}

