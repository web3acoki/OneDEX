type SelectedMarketSymbol = string | null

let selectedSymbol: SelectedMarketSymbol = null
const listeners = new Set<(next: SelectedMarketSymbol) => void>()

export function getSelectedMarketSymbol(): SelectedMarketSymbol {
  return selectedSymbol
}

export function setSelectedMarketSymbol(symbol: string) {
  if (selectedSymbol === symbol) return
  selectedSymbol = symbol
  listeners.forEach((listener) => listener(selectedSymbol))
}

export function clearSelectedMarketSymbol() {
  if (selectedSymbol === null) return
  selectedSymbol = null
  listeners.forEach((listener) => listener(selectedSymbol))
}

export function subscribeSelectedMarketSymbol(listener: (next: SelectedMarketSymbol) => void): () => void {
  listeners.add(listener)
  listener(selectedSymbol)

  return () => {
    listeners.delete(listener)
  }
}

export type { SelectedMarketSymbol }

