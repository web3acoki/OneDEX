import { getHyperliquidInfoUrl } from "./urls"

type CandleInterval = "1m" | "3m" | "5m" | "15m" | "30m" | "1h" | "2h" | "4h" | "8h" | "12h" | "1d" | "3d" | "1w" | "1M"

type CandleSnapshotRequest = {
  type: "candleSnapshot"
  req: {
    coin: string
    interval: CandleInterval
    startTime: number
    endTime: number
  }
}

type CandleSnapshotItem = {
  t: number
  T: number
  c: string
}

type ChartPoint = {
  timestamp: number
  value: number
}

const INTERVAL_MS: Record<CandleInterval, number> = {
  "1m": 60_000,
  "3m": 180_000,
  "5m": 300_000,
  "15m": 900_000,
  "30m": 1_800_000,
  "1h": 3_600_000,
  "2h": 7_200_000,
  "4h": 14_400_000,
  "8h": 28_800_000,
  "12h": 43_200_000,
  "1d": 86_400_000,
  "3d": 259_200_000,
  "1w": 604_800_000,
  "1M": 2_592_000_000,
}

export async function fetchCandleSnapshot(coin: string, interval: CandleInterval = "15m", intervalsCount = 200): Promise<ChartPoint[]> {
  if (!coin) return []
  const endTime = Date.now()
  const startTime = endTime - (INTERVAL_MS[interval] * intervalsCount)
  const payload: CandleSnapshotRequest = { type: "candleSnapshot", req: { coin, interval, startTime, endTime } }

  const response = await fetch(getHyperliquidInfoUrl(), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!response.ok) throw new Error(`HTTP ${response.status}`)

  const data = (await response.json()) as CandleSnapshotItem[]
  console.log("[Hyperliquid] candleSnapshot raw:", JSON.stringify(data))
  return data.map((item) => ({ timestamp: item.t, value: Number(item.c) }))
}

export type { CandleInterval, ChartPoint }

