import React from "react"
import { ScrollView, View, type ViewStyle } from "react-native"
import { Portfolio } from "@/components/panel/Portfolio"
import { WalletHeader } from "@/components/panel/WalletHeader"

export default function Wallet() {
  // Keep wallet page clean: logout is handled in the Login screen.

  const spacerStyle: ViewStyle = {
    marginTop: 24,
    paddingHorizontal: 24,
    height: 48,
  }

  return <>
    <WalletHeader />
    <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
      <Portfolio />
      <View style={spacerStyle} />
    </ScrollView>
  </>
}