import React from "react"
import { usePrivy } from "@privy-io/expo"
import { View } from "react-native"
import { OneDexButton } from "@/components/content/general/OneDexButton"
import { MenuHeader } from "@/components/panel/header/MenuHeader"
import { getHyperliquidNetwork, toggleHyperliquidNetwork } from "@/services/hyperliquid"
import { resetMarketFeed } from "@/services/hyperliquid/market"

type MenuProps = {
  onBack: () => void
}

export default function Menu({ onBack }: MenuProps) {
  const [network, setNetwork] = React.useState(getHyperliquidNetwork())
  const { logout } = usePrivy()

  const cellWrapStyle = {
    marginTop: 12,
    marginHorizontal: 24,
    height: 48,
  }

  return <>
    <MenuHeader onBack={onBack} />
    <View style={cellWrapStyle}>
      <OneDexButton
        label={`Switch to ${network === "mainnet" ? "testnet" : "mainnet"}`}
        onPress={() => {
          const next = toggleHyperliquidNetwork()
          resetMarketFeed()
          setNetwork(next)
        }}
      />
    </View>
    <View style={cellWrapStyle}>
      <OneDexButton label="Logout" backgroundColor="#EF4444" onPress={async () => { await logout(); onBack() }} />
    </View>
  </>
}

