import { getHyperliquidInfoUrl } from "./urls"

type ClearinghouseStateRequest = {
  type: "clearinghouseState"
  user: string
}

type AssetPosition = {
  position: {
    coin: string
    leverage: { type: string; value: number }
    entryPx: string
    positionValue: string
    unrealizedPnl: string
    returnOnEquity: string
  }
}

type ClearinghouseStateResponse = {
  assetPositions: AssetPosition[]
}

type PositionItemView = {
  symbol: string
  leverageText: string
  pnlText: string
  pnlColor: string
  sizeText: string
  entryPriceText: string
}

const positionItemsByUser: Record<string, PositionItemView[]> = {}

function formatUsd(value: number): string {
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function toPositionItemView(item: AssetPosition): PositionItemView {
  const position = item.position
  const side = Number(position.positionValue) >= 0 ? "Long" : "Short"
  const leverageText = `${position.leverage.value}x ${side}`
  const pnl = Number(position.unrealizedPnl)
  const roe = Number(position.returnOnEquity) * 100
  const pnlSign = pnl >= 0 ? "+" : "-"
  const pnlText = `${pnlSign}$${Math.abs(pnl).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${roe >= 0 ? "+" : ""}${roe.toFixed(2)}%)`
  return {
    symbol: position.coin,
    leverageText,
    pnlText,
    pnlColor: pnl >= 0 ? "#00BC7D" : "#EF4444",
    sizeText: formatUsd(Math.abs(Number(position.positionValue))),
    entryPriceText: Number(position.entryPx).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  }
}

export async function fetchClearinghouseState(user: string): Promise<ClearinghouseStateResponse> {
  const payload: ClearinghouseStateRequest = { type: "clearinghouseState", user }

  const response = await fetch(getHyperliquidInfoUrl(), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!response.ok) throw new Error(`HTTP ${response.status}`)

  const data = (await response.json()) as ClearinghouseStateResponse
  console.log("[Hyperliquid] clearinghouseState:", data)
  return data
}

export async function fetchPositionItems(user: string): Promise<PositionItemView[]> {
  if (!user) return []
  const data = await fetchClearinghouseState(user)
  const next = data.assetPositions.map(toPositionItemView)
  positionItemsByUser[user] = next
  return next
}

export function getPositionItems(user: string): PositionItemView[] {
  return user ? (positionItemsByUser[user] ?? []) : []
}

export type { PositionItemView }

