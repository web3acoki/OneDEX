import React from "react";
import { usePrivy } from "@privy-io/expo";
import Home from "@/components/page/Home";
import Login from "@/components/page/Login";
import { BottomBar } from "@/components/panel/BottomBar";
import { View, type ViewStyle } from "react-native";
import Trade from "@/components/page/Trade";
import Strategy from "@/components/page/Strategy";
import Wallet from "@/components/page/Wallet";
import { DebugBar } from "@/components/panel/DebugBar";

export default function Index() {
  const { user } = usePrivy();
  const [activeTab, setActiveTab] = React.useState<"home" | "trade" | "strategy" | "wallet">("home");
  const Screen = activeTab === "home" ? Home : activeTab === "trade" ? Trade : activeTab === "strategy" ? Strategy : Wallet;

  const container: ViewStyle = { flex: 1, backgroundColor: "#F8FAFC" };
  const content: ViewStyle = { flex: 1 };

  if (!user) {
    return (
      <View style={container}>
        <View style={content}>
          <Login />
        </View>
        <DebugBar />
      </View>
    );
  }


  return (
    <View style={container}>
      <View style={content}>
        <Screen />
      </View>
      <DebugBar />
      <BottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
}