import React from "react"
import { View, type ViewStyle } from "react-native"
import { OneDexButton } from "@/components/content/OneDexButton"
import { useLoginMode } from "@/components/page/Login"

export function LoginButtons() {
  const { setMode } = useLoginMode()
  const buttonsWrapStyle: ViewStyle = {
    top: 152,
    alignItems: "center",
    alignSelf: "center",
  }
  const cellStyle: ViewStyle = {
    width: 329.4,
    height: 64,
    marginTop: 12,
  }

  return <>
    <View style={buttonsWrapStyle}>
      <View style={cellStyle}>
        <OneDexButton label="Continue with Email" iconName="mail-outline" onPress={() => setMode("email")}/>
      </View>

      <View style={cellStyle}>
        <OneDexButton label="Continue with Apple" iconName="logo-apple" onPress={() => {}}/>
      </View>

      <View style={cellStyle}>
        <OneDexButton label="Connect External Wallet" iconName="wallet-outline" onPress={() => {}}/>
      </View>
    </View>
  </>
}