import React from "react"
import { usePrivy } from "@privy-io/expo"
import { View } from "react-native"
import { OneDexButton } from "@/components/content/OneDexButton"
import { MenuHeader } from "@/components/panel/MenuHeader"

type MenuProps = {
  onBack: () => void
}

export default function Menu({ onBack }: MenuProps) {
  const { logout } = usePrivy()

  const logoutWrapStyle = {
    marginTop: 24,
    marginHorizontal: 24,
    height: 48,
  }

  return <>
    <MenuHeader onBack={onBack} />
    <View style={logoutWrapStyle}>
      <OneDexButton label="Logout" backgroundColor="#EF4444" onPress={async () => { await logout(); onBack() }} />
    </View>
  </>
}

