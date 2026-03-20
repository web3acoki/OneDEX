import * as SecureStore from "expo-secure-store"

const WATCHLIST_KEY = "onedex_watchlist_symbols"

export const DEFAULT_WATCHLIST_SYMBOLS = ["BTC", "ETH", "SOL"] as const

function normalizeSymbols(symbols: string[]): string[] {
  const normalized = symbols
    .map((s) => s.trim().toUpperCase())
    .filter((s) => !!s)

  return Array.from(new Set(normalized))
}

export async function loadWatchlistSymbols(): Promise<string[]> {
  try {
    const raw = await SecureStore.getItemAsync(WATCHLIST_KEY)
    if (!raw) return [...DEFAULT_WATCHLIST_SYMBOLS]

    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return [...DEFAULT_WATCHLIST_SYMBOLS]

    const symbols = parsed
      .map((item) => String(item))

    const normalized = normalizeSymbols(symbols)
    return normalized.length ? normalized : [...DEFAULT_WATCHLIST_SYMBOLS]
  } catch {
    return [...DEFAULT_WATCHLIST_SYMBOLS]
  }
}

export async function saveWatchlistSymbols(symbols: string[]): Promise<void> {
  const normalized = normalizeSymbols(symbols)
  const value = JSON.stringify(normalized.length ? normalized : [...DEFAULT_WATCHLIST_SYMBOLS])
  await SecureStore.setItemAsync(WATCHLIST_KEY, value)
}

