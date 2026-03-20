import React from "react"
import { DEFAULT_WATCHLIST_SYMBOLS, loadWatchlistSymbols } from "@/services/watchlist"

export function useWatchlistSymbols() {
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

  return symbols
}

