import { getHyperliquidInfoUrl } from "./urls"

type SpotClearinghouseStateRequest = {
  type: "spotClearinghouseState"
  user: string
}

type SpotBalance = {
  coin: string
  hold: string
  total: string
}

type SpotClearinghouseStateResponse = {
  balances: SpotBalance[]
}

const spotBalancesByUser: Record<string, SpotBalance[]> = {}

export async function fetchSpotClearinghouseState(user: string): Promise<SpotClearinghouseStateResponse> {
  const payload: SpotClearinghouseStateRequest = { type: "spotClearinghouseState", user }

  const response = await fetch(getHyperliquidInfoUrl(), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!response.ok) throw new Error(`HTTP ${response.status}`)

  const data = (await response.json()) as SpotClearinghouseStateResponse
  return data
}

export async function fetchSpotBalances(user: string): Promise<SpotBalance[]> {
  if (!user) return []
  const data = await fetchSpotClearinghouseState(user)
  spotBalancesByUser[user] = data.balances
  return data.balances
}

export function getSpotBalances(user: string): SpotBalance[] {
  return user ? (spotBalancesByUser[user] ?? []) : []
}

export type { SpotBalance }

