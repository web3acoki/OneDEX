import { getHyperliquidInfoUrl } from "./urls"

type HistoricalOrderRequest = {
  type: "historicalOrders"
  user: string
}

type HistoricalOrderResponse = unknown

export async function fetchHistoricalOrders(user: string): Promise<HistoricalOrderResponse> {
  const payload: HistoricalOrderRequest = { type: "historicalOrders", user }

  const response = await fetch(getHyperliquidInfoUrl(), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!response.ok) throw new Error(`HTTP ${response.status}`)

  const data = (await response.json()) as HistoricalOrderResponse
  return data
}

