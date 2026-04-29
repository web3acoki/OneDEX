import React from "react";
import { View, type ViewStyle } from "react-native";
import { BottomBarItem } from "@/components/content/item/BottomBarItem";

type TabKey = "home" | "trade" | "strategy" | "wallet";

type BottomBarProps = {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
};

export function BottomBar({ activeTab, setActiveTab }: BottomBarProps) {
  const panelStyle: ViewStyle = {
    left: 0,
    right: 0,
    bottom: 0,
    height: 88,
    paddingTop: 13,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    backgroundColor: "#FFFFFF",
  };

  const containerStyle: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
  };

  return <>
    <View style={panelStyle}>
      <View style={containerStyle}>
        <BottomBarItem label="Home" icon="home-outline" active={activeTab === "home"} onPress={() => setActiveTab("home")} />
        <BottomBarItem label="Trade" icon="swap-horizontal-outline" active={activeTab === "trade"} onPress={() => setActiveTab("trade")} />
        <BottomBarItem label="Strategy" icon="flash-outline" active={activeTab === "strategy"} onPress={() => setActiveTab("strategy")} />
        <BottomBarItem label="Wallet" icon="wallet-outline" active={activeTab === "wallet"} onPress={() => setActiveTab("wallet")} />
      </View>
    </View>
  </>
}
