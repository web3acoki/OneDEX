const HYPERLIQUID_WS_URL = "wss://api.hyperliquid.xyz/ws";
const HYPERLIQUID_INFO_URL = "https://api.hyperliquid.xyz/info";

type HyperliquidMeta = {
  universe?: Array<{ name?: string }>;
};

type AllMidsPayload = {
  mids?: Record<string, string>;
};

type AllMidsMessage = {
  channel?: string;
  data?: AllMidsPayload;
  mids?: Record<string, string>;
};

type ActiveEntry = {
  symbol: string;
  price: string;
};

type ActiveMidsCallback = (lines: string[]) => void;
type ErrorCallback = (message: string) => void;
type Listener = { onUpdate: ActiveMidsCallback; onError: ErrorCallback };

let ws: WebSocket | null = null;
let started = false;
let targetSymbols: string[] = [];
const latestPriceBySymbol: Record<string, string> = {};
let currentLines: string[] = ["Loading Hyperliquid prices..."];
const listeners = new Map<number, Listener>();
let nextListenerId = 1;

async function fetchTopSymbols(limit = 20): Promise<string[]> {
  const response = await fetch(HYPERLIQUID_INFO_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ type: "metaAndAssetCtxs" }),
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const data = (await response.json()) as [HyperliquidMeta, unknown];
  const universe = data?.[0]?.universe ?? [];
  return universe.slice(0, limit).map((item) => item?.name).filter((item): item is string => !!item);
}

function emitUpdate(lines: string[]) {
  currentLines = lines;
  listeners.forEach((listener) => listener.onUpdate(lines));
}

function emitError(message: string) {
  listeners.forEach((listener) => listener.onError(message));
}

function ensureStarted() {
  if (started) return;
  started = true;

  void fetchTopSymbols(20)
    .then((symbols) => {
      targetSymbols = symbols;
      const initialLines = targetSymbols.map((symbol) => `${symbol}: -`);
      emitUpdate(initialLines.length ? initialLines : ["No market data"]);
    })
    .catch((error) => {
      const message = error instanceof Error ? error.message : "Unknown error";
      emitError(`Hyperliquid list failed: ${message}`);
    });

  ws = new WebSocket(HYPERLIQUID_WS_URL);
  ws.onopen = () => {
    ws?.send(JSON.stringify({ method: "subscribe", subscription: { type: "allMids" } }));
  };

  ws.onmessage = (event) => {
    try {
      const message = JSON.parse(String(event.data)) as AllMidsMessage;
      const mids = message?.data?.mids ?? message?.mids;
      if (!mids) return;

      Object.entries(mids).forEach(([symbol, price]) => {
        latestPriceBySymbol[symbol] = price;
      });

      const activeList: ActiveEntry[] = targetSymbols.map((symbol) => ({
        symbol,
        price: latestPriceBySymbol[symbol] ?? "-",
      }));
      const lines = activeList.map((item) => `${item.symbol}: ${item.price}`);
      emitUpdate(lines.length ? lines : ["No market data"]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown parse error";
      emitError(`Hyperliquid parse failed: ${message}`);
    }
  };

  ws.onerror = () => emitError("Hyperliquid websocket error");
  ws.onclose = () => emitError("Hyperliquid websocket closed");
}

export function subscribeTop20Mids(onUpdate: ActiveMidsCallback, onError: ErrorCallback): () => void {
  ensureStarted();

  const listenerId = nextListenerId;
  nextListenerId += 1;
  listeners.set(listenerId, { onUpdate, onError });
  onUpdate(currentLines);

  return () => {
    listeners.delete(listenerId);
  };
}
