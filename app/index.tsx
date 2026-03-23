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
import Market from "@/components/page/Market";
import Search from "@/components/page/Search";
import { getSelectedMarketSymbol, clearSelectedMarketSymbol, subscribeSelectedMarketSymbol, type SelectedMarketSymbol } from "@/services/trade/selectedMarketStore";
import { getAuthScreen, subscribeAuthScreen, clearAuthScreen, type AuthScreen } from "@/services/auth/authScreenStore";

export default function Index() {
  const { user } = usePrivy();
  const [activeTab, setActiveTab] = React.useState<"home" | "trade" | "strategy" | "wallet">("home");
  const [selectedSymbol, setSelectedSymbol] = React.useState<SelectedMarketSymbol>(getSelectedMarketSymbol());
  const [authScreen, setAuthScreen] = React.useState<AuthScreen>(getAuthScreen());
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
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
      <Market symbol={selectedSymbol} onBack={clearSelectedMarketSymbol} onPressSearch={() => setIsSearchOpen(true)} />
    </>
  }

  if (isSearchOpen) {
    return <>
      <Search onBack={() => setIsSearchOpen(false)} />
      <DebugBar />
    </>
  }

  return <>
      {activeTab === "home" ? <Home onJumpToTradeWatchlist={jumpToTradeWatchlist} onPressSearch={() => setIsSearchOpen(true)} /> : activeTab === "trade" ? <Trade onPressSearch={() => setIsSearchOpen(true)} /> : activeTab === "strategy" ? <Strategy /> : <Wallet />}
      <DebugBar />
      <BottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
  </>
}