import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity, View, type ViewStyle } from "react-native"
import { loadWatchlistSymbols, saveWatchlistSymbols, DEFAULT_WATCHLIST_SYMBOLS } from "@/services/watchlist"

type MarketDetailHeaderProps = {
  symbol: string
  onBack: () => void
}

const iconButtonStyle: ViewStyle = {
  width: 36,
  height: 36,
  borderRadius: 18,
  backgroundColor: "#FFFFFF",
  alignItems: "center",
  justifyContent: "center",
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 2,
}

export function MarketDetailHeader({ symbol, onBack }: MarketDetailHeaderProps) {
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
      <TouchableOpacity style={iconButtonStyle} activeOpacity={0.8} onPress={onBack}>
        <Ionicons
          name="chevron-up"
          size={20}
          color="#62748E"
          style={{ transform: [{ rotate: "270deg" }] }}
        />
      </TouchableOpacity>

      <View style={rightGroupStyle}>
        <TouchableOpacity style={iconButtonStyle} activeOpacity={0.8} onPress={() => void toggleFavorite()}>
          <Ionicons name="star" size={20} color={favoriteColor} />
        </TouchableOpacity>
        <TouchableOpacity style={iconButtonStyle} activeOpacity={0.8}>
          <Ionicons name="search" size={20} color="#62748E" />
        </TouchableOpacity>
      </View>
    </View>
  </>
}

