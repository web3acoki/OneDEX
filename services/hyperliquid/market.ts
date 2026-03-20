const HYPERLIQUID_WS_URL = "wss://api.hyperliquid.xyz/ws"
const HYPERLIQUID_INFO_URL = "https://api.hyperliquid.xyz/info"

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

async function fetchTopMarkets(limit = 20): Promise<{
  symbols: string[]
  prevBySymbol: Record<string, string>
  initialPriceBySymbol: Record<string, string>
}> {
  const response = await fetch(HYPERLIQUID_INFO_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ type: "metaAndAssetCtxs" }),
  })

  if (!response.ok) throw new Error(`HTTP ${response.status}`)

  const data = (await response.json()) as [HyperliquidMeta, MarketCtx[]]
  const universe = data?.[0]?.universe ?? []
  const ctxs = data?.[1] ?? []

  const symbols = universe.slice(0, limit).map((item) => item?.name).filter((name): name is string => !!name)

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

function ensureStarted() {
  if (started) return
  started = true

  void fetchTopMarkets(20)
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

  ws = new WebSocket(HYPERLIQUID_WS_URL)
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

export function subscribeTop20Markets(onUpdate: ActiveMidsCallback, onError: ErrorCallback): () => void {
  ensureStarted()

  const listenerId = nextListenerId
  nextListenerId += 1
  listeners.set(listenerId, { onUpdate, onError })
  onUpdate(currentQuotes)

  return () => {
    listeners.delete(listenerId)
  }
}

