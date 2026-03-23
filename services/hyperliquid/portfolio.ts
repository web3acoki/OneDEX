import { getHyperliquidInfoUrl } from "./urls"

type PortfolioRequest = {
  type: "portfolio"
  user: string
}

type PortfolioResponse = unknown

type PortfolioDay = {
  accountValueHistory: Array<[number, string]>
  pnlHistory: Array<[number, string]>
}

type PortfolioView = {
  portfolioValue: number
  pnlPercent: number
}

const DEFAULT_PORTFOLIO_VIEW: PortfolioView = { portfolioValue: 0, pnlPercent: 0 }
const portfolioViewByUser: Record<string, PortfolioView> = {}

export async function fetchPortfolio(user: string): Promise<PortfolioResponse> {
  const payload: PortfolioRequest = { type: "portfolio", user }

  const response = await fetch(getHyperliquidInfoUrl(), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!response.ok) throw new Error(`HTTP ${response.status}`)

  const data = (await response.json()) as PortfolioResponse
  return data
}

export async function fetchPortfolioView(user: string): Promise<PortfolioView> {
  if (!user) return DEFAULT_PORTFOLIO_VIEW
  const response = (await fetchPortfolio(user)) as Array<[string, PortfolioDay]>
  const day = response.find(([key]) => key === "day")![1]
  const parsed = { portfolioValue: Number(day.accountValueHistory[day.accountValueHistory.length - 1][1]), pnlPercent: Number(day.pnlHistory[day.pnlHistory.length - 1][1]) }
  portfolioViewByUser[user] = parsed
  return parsed
}

export function getPortfolioView(user: string): PortfolioView {
  return portfolioViewByUser[user] ?? DEFAULT_PORTFOLIO_VIEW
}