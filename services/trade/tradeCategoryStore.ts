type TradeCategory = "All" | "Watchlist"

let currentCategory: TradeCategory = "All"
const listeners = new Set<(next: TradeCategory) => void>()

export function getTradeCategory(): TradeCategory {
  return currentCategory
}

export function setTradeCategory(next: TradeCategory) {
  if (currentCategory === next) return
  currentCategory = next
  listeners.forEach((listener) => listener(currentCategory))
}

export function subscribeTradeCategory(listener: (next: TradeCategory) => void): () => void {
  listeners.add(listener)
  listener(currentCategory)

  return () => {
    listeners.delete(listener)
  }
}

export type { TradeCategory }

