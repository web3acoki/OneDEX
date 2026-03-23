type HyperliquidNetwork = "mainnet" | "testnet"

let activeNetwork: HyperliquidNetwork = "testnet"

const HYPERLIQUID_URLS = {
  mainnet: {
    info: "https://api.hyperliquid.xyz/info",
    ws: "wss://api.hyperliquid.xyz/ws",
  },
  testnet: {
    info: "https://api.hyperliquid-testnet.xyz/info",
    ws: "wss://api.hyperliquid-testnet.xyz/ws",
  },
} as const

export function getHyperliquidNetwork(): HyperliquidNetwork {
  return activeNetwork
}

export function getHyperliquidInfoUrl(): string {
  return HYPERLIQUID_URLS[activeNetwork].info
}

export function getHyperliquidWsUrl(): string {
  return HYPERLIQUID_URLS[activeNetwork].ws
}

export function toggleHyperliquidNetwork(): HyperliquidNetwork {
  activeNetwork = activeNetwork === "mainnet" ? "testnet" : "mainnet"
  return activeNetwork
}

