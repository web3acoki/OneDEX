import { getHyperliquidInfoUrl } from "./urls"

type VaultEquitiesRequest = {
  type: "userVaultEquities"
  user: string
}

type VaultEquitiesResponse = unknown

export async function fetchVaultDeposits(user: string): Promise<VaultEquitiesResponse> {
  const payload: VaultEquitiesRequest = { type: "userVaultEquities", user }

  const response = await fetch(getHyperliquidInfoUrl(), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!response.ok) throw new Error(`HTTP ${response.status}`)

  const data = (await response.json()) as VaultEquitiesResponse
  return data
}

