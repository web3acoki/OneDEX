import { getHyperliquidInfoUrl, getHyperliquidWsUrl } from "./urls"

type HyperliquidMeta = {
  universe?: Array<{ name?: string }>
}

type AllMidsPayload = {
  mids?: Record<string, string>
}

type AllMidsMessage = {
  channel?: string
  data?: AllMidsPayload
  mids?: Record<string, string>
}

type MarketCtx = {
  prevDayPx?: string
  midPx?: string
  markPx?: string
}

export type MarketQuote = {
  symbol: string
  price: string
  changePct: number
}

type ActiveMidsCallback = (quotes: MarketQuote[]) => void
type ErrorCallback = (message: string) => void
type Listener = { onUpdate: ActiveMidsCallback; onError: ErrorCallback }

let ws: WebSocket | null = null
let started = false
let isAllMarketsMode = false

let targetSymbols: string[] = []
let prevDayPxBySymbol: Record<string, string> = {}
let latestPriceBySymbol: Record<string, string> = {}

let currentQuotes: MarketQuote[] = []
const listeners = new Map<number, Listener>()
let nextListenerId = 1

function computeChangePct(price: string, prevDayPx: string): number {
  const p = Number(price)
  const v = Number(prevDayPx)
  return ((p - v) / v) * 100
}

async function fetchMarkets(limit?: number): Promise<{
  symbols: string[]
  prevBySymbol: Record<string, string>
  initialPriceBySymbol: Record<string, string>
}> {
  const response = await fetch(getHyperliquidInfoUrl(), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ type: "metaAndAssetCtxs" }),
  })

  if (!response.ok) throw new Error(`HTTP ${response.status}`)

  const data = (await response.json()) as [HyperliquidMeta, MarketCtx[]]
  const universe = data?.[0]?.universe ?? []
  const ctxs = data?.[1] ?? []

  const selected = typeof limit === "number" ? universe.slice(0, limit) : universe
  const symbols = selected.map((item) => item?.name).filter((name): name is string => !!name)

  const prevBySymbol: Record<string, string> = {}
  const initialPriceBySymbol: Record<string, string> = {}

  symbols.forEach((symbol, index) => {
    const ctx = ctxs[index]
    const prevDayPx = ctx?.prevDayPx
    const initialPrice = ctx?.midPx ?? ctx?.markPx
    if (prevDayPx) prevBySymbol[symbol] = prevDayPx
    if (initialPrice) latestPriceBySymbol[symbol] = initialPrice
    initialPriceBySymbol[symbol] = initialPrice ?? "-"
  })

  return { symbols, prevBySymbol, initialPriceBySymbol }
}

function emitUpdate(quotes: MarketQuote[]) {
  currentQuotes = quotes
  listeners.forEach((listener) => listener.onUpdate(quotes))
}

function emitError(message: string) {
  listeners.forEach((listener) => listener.onError(message))
}

function ensureStarted(limit?: number) {
  const nextAllMarketsMode = typeof limit === "undefined"

  if (started && !(nextAllMarketsMode && !isAllMarketsMode)) return

  // Upgrade path: if service started in top20 mode and Search requests all markets,
  // refetch the full universe without recreating websocket connection.
  if (started && nextAllMarketsMode && !isAllMarketsMode) {
    isAllMarketsMode = true

    void fetchMarkets(undefined)
      .then(({ symbols, prevBySymbol, initialPriceBySymbol }) => {
        targetSymbols = symbols
        prevDayPxBySymbol = prevBySymbol
        latestPriceBySymbol = { ...latestPriceBySymbol, ...initialPriceBySymbol }

        const nextQuotes: MarketQuote[] = targetSymbols.map((symbol) => ({
          symbol,
          price: latestPriceBySymbol[symbol] ?? "-",
          changePct: computeChangePct(latestPriceBySymbol[symbol] ?? "0", prevDayPxBySymbol[symbol] ?? "0"),
        }))

        emitUpdate(nextQuotes)
      })
      .catch((error) => {
        const message = error instanceof Error ? error.message : "Unknown error"
        emitError(`Hyperliquid list upgrade failed: ${message}`)
      })
    return
  }

  started = true
  isAllMarketsMode = nextAllMarketsMode

  void fetchMarkets(limit)
    .then(({ symbols, prevBySymbol, initialPriceBySymbol }) => {
      targetSymbols = symbols
      prevDayPxBySymbol = prevBySymbol
      latestPriceBySymbol = { ...initialPriceBySymbol }

      const initialQuotes: MarketQuote[] = targetSymbols.map((symbol) => ({
        symbol,
        price: latestPriceBySymbol[symbol] ?? "-",
        changePct: computeChangePct(latestPriceBySymbol[symbol] ?? "0", prevDayPxBySymbol[symbol] ?? "0"),
      }))

      emitUpdate(initialQuotes)
    })
    .catch((error) => {
      const message = error instanceof Error ? error.message : "Unknown error"
      emitError(`Hyperliquid list failed: ${message}`)
    })

  ws = new WebSocket(getHyperliquidWsUrl())
  ws.onopen = () => {
    ws?.send(JSON.stringify({ method: "subscribe", subscription: { type: "allMids" } }))
  }

  ws.onmessage = (event) => {
    try {
      const message = JSON.parse(String(event.data)) as AllMidsMessage
      const mids = message?.data?.mids ?? message?.mids
      if (!mids) return

      Object.entries(mids).forEach(([symbol, price]) => {
        latestPriceBySymbol[symbol] = price
      })

      if (!targetSymbols.length) return

      const quotes: MarketQuote[] = targetSymbols.map((symbol) => ({
        symbol,
        price: latestPriceBySymbol[symbol] ?? "-",
        changePct: computeChangePct(latestPriceBySymbol[symbol] ?? "0", prevDayPxBySymbol[symbol] ?? "0"),
      }))

      emitUpdate(quotes)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown parse error"
      emitError(`Hyperliquid parse failed: ${message}`)
    }
  }

  ws.onerror = () => emitError("Hyperliquid websocket error")
  ws.onclose = () => emitError("Hyperliquid websocket closed")
}

function subscribeMarkets(limit: number | undefined, onUpdate: ActiveMidsCallback, onError: ErrorCallback): () => void {
  ensureStarted(limit)

  const listenerId = nextListenerId
  nextListenerId += 1
  listeners.set(listenerId, { onUpdate, onError })
  onUpdate(currentQuotes)

  return () => {
    listeners.delete(listenerId)
  }
}

export function subscribeTop20Markets(onUpdate: ActiveMidsCallback, onError: ErrorCallback): () => void {
  return subscribeMarkets(20, onUpdate, onError)
}

export function subscribeAllMarkets(onUpdate: ActiveMidsCallback, onError: ErrorCallback): () => void {
  return subscribeMarkets(undefined, onUpdate, onError)
}

export function getMarketQuotes(): MarketQuote[] {
  return currentQuotes
}

export function resetMarketFeed() {
  ws?.close()
  ws = null
  started = false
  isAllMarketsMode = false
  targetSymbols = []
  prevDayPxBySymbol = {}
  latestPriceBySymbol = {}
  currentQuotes = []
}

