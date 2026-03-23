import React from "react"
import { useEmbeddedEthereumWallet } from "@privy-io/expo"
import { Pressable, ScrollView, View, type ViewStyle } from "react-native"
import { OneDexText } from "@/components/content/OneDexText"
import { Cards } from "@/components/panel/Cards"
import { Portfolio } from "@/components/panel/Portfolio"
import { WalletHeader } from "@/components/panel/WalletHeader"
import { fetchClearinghouseState, fetchHistoricalOrders, fetchSpotClearinghouseState, fetchVaultDeposits } from "@/services/hyperliquid"

export default function Wallet() {
  const { wallets } = useEmbeddedEthereumWallet()
  const walletAddress = wallets[0]?.address ?? ""
  const [active, setActive] = React.useState<"Balances" | "Positions" | "Orders">("Balances")

  React.useEffect(() => {
    if (!walletAddress) return
    void fetchClearinghouseState(walletAddress)
    void fetchHistoricalOrders(walletAddress)
    void fetchSpotClearinghouseState(walletAddress)
    void fetchVaultDeposits(walletAddress)
  }, [walletAddress])

  const spacerStyle: ViewStyle = {
    marginTop: 24,
    paddingHorizontal: 24,
    height: 48,
  }

  const tabsStyle: ViewStyle = {
    marginTop: 24,
    marginHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  }

  const tabPressableStyle: ViewStyle = {
    height: 32,
    justifyContent: "center",
  }

  return <>
    <WalletHeader />
    <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
      <Portfolio />
      <View style={tabsStyle}>
        <Pressable style={tabPressableStyle} onPress={() => setActive("Balances")}>
          <OneDexText text="Balances" fontSize={18} fontWeight="700" color={active === "Balances" ? "#0F172B" : "#90A1B9"} lineHeight={28} />
        </Pressable>
        <Pressable style={tabPressableStyle} onPress={() => setActive("Positions")}>
          <OneDexText text="Positions" fontSize={18} fontWeight="700" color={active === "Positions" ? "#0F172B" : "#90A1B9"} lineHeight={28} />
        </Pressable>
        <Pressable style={tabPressableStyle} onPress={() => setActive("Orders")}>
          <OneDexText text="Orders" fontSize={18} fontWeight="700" color={active === "Orders" ? "#0F172B" : "#90A1B9"} lineHeight={28} />
        </Pressable>
      </View>
      {active === "Balances" ? <Cards mode="balances" cardMarginTop={8} /> : active === "Positions" ? <Cards mode="positions" cardMarginTop={8} /> : null}
      <View style={spacerStyle} />
    </ScrollView>
  </>
}