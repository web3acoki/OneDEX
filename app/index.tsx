import React from "react";
import { usePrivy } from "@privy-io/expo";
import Home from "@/components/page/Home";
import Login from "@/components/page/Login";
import Menu from "@/components/page/Menu";
import { BottomBar } from "@/components/panel/BottomBar";
import Trade from "@/components/page/Trade";
import Strategy from "@/components/page/Strategy";
import Wallet from "@/components/page/Wallet";
import { DebugBar } from "@/components/panel/DebugBar";
import { setTradeCategory } from "@/services/trade/tradeCategoryStore";
import MarketDetail from "@/components/page/MarketDetail";
import { getSelectedMarketSymbol, clearSelectedMarketSymbol, subscribeSelectedMarketSymbol, type SelectedMarketSymbol } from "@/services/trade/selectedMarketStore";
import { getAuthScreen, subscribeAuthScreen, clearAuthScreen, type AuthScreen } from "@/services/auth/authScreenStore";

export default function Index() {
  const { user } = usePrivy();
  const [activeTab, setActiveTab] = React.useState<"home" | "trade" | "strategy" | "wallet">("home");
  const [selectedSymbol, setSelectedSymbol] = React.useState<SelectedMarketSymbol>(getSelectedMarketSymbol());
  const [authScreen, setAuthScreen] = React.useState<AuthScreen>(getAuthScreen());
  const jumpToTradeWatchlist = () => {
    setTradeCategory("Watchlist");
    setActiveTab("trade");
  };

  React.useEffect(() => {
    return subscribeSelectedMarketSymbol((next) => {
      setSelectedSymbol(next);
    })
  }, []);

  React.useEffect(() => {
    return subscribeAuthScreen((next) => {
      setAuthScreen(next);
    })
  }, []);

  if (!user) {
    return <>
      <Login />
      <DebugBar />
    </>
  }

  if (authScreen === "login") {
    return <>
      <Menu onBack={clearAuthScreen} />
      <DebugBar />
    </>
  }

  if (selectedSymbol) {
    return <>
      <MarketDetail symbol={selectedSymbol} onBack={clearSelectedMarketSymbol} />
    </>
  }

  return <>
      {activeTab === "home" ? <Home onJumpToTradeWatchlist={jumpToTradeWatchlist} /> : activeTab === "trade" ? <Trade /> : activeTab === "strategy" ? <Strategy /> : <Wallet />}
      <DebugBar />
      <BottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
  </>
}