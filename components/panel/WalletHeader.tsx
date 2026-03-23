import React from "react"
import { useEmbeddedEthereumWallet } from "@privy-io/expo"
import * as Clipboard from "expo-clipboard"
import { Ionicons } from "@expo/vector-icons"
import { Pressable, View, type ViewStyle } from "react-native"
import { OneDexText } from "@/components/content/OneDexText"
import { HeaderButton } from "@/components/content/HeaderButton"
import { showLoginScreen } from "@/services/auth/authScreenStore"

export function WalletHeader() {
  const { wallets } = useEmbeddedEthereumWallet()
  const [copied, setCopied] = React.useState(false)

  const walletAddress = wallets[0]?.address ?? ""
  const shortAddress = walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"

  const headerStyle: ViewStyle = {
    height: 104,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 48,
  }

  const leftGroupStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  }

  const addressRowStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
  }

  const copyIconWrapStyle: ViewStyle = {
    marginLeft: 6,
  }

  return <>
    <View style={headerStyle}>
      <View style={leftGroupStyle}>
        <HeaderButton name="person" onPress={showLoginScreen} />
        <View style={addressRowStyle}>
          <OneDexText text={shortAddress} fontSize={14} lineHeight={20} />
          <Pressable
            style={copyIconWrapStyle}
            onPress={async () => {
              await Clipboard.setStringAsync(walletAddress)
              setCopied(true)
              setTimeout(() => setCopied(false), 1200)
            }}
          >
            <Ionicons name="copy-outline" size={14} color="#90A1B9" />
          </Pressable>
          {copied ? <OneDexText text="Copied" fontSize={12} color="#00BC7D" marginLeft={6} /> : null}
        </View>
      </View>

      <HeaderButton name="settings-outline" onPress={showLoginScreen} />
    </View>
  </>
}

