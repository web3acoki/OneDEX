import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity, View, type ViewStyle } from "react-native"
import { OneDexText } from "@/components/content/OneDexText"
import { HeaderIconButton } from "@/components/content/HeaderIconButton"
import { showLoginScreen } from "@/services/auth/authScreenStore"

export function WalletHeader() {
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

  const chainBadgeStyle: ViewStyle = {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#4F39F6",
    alignItems: "center",
    justifyContent: "center",
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
        <TouchableOpacity style={chainBadgeStyle} activeOpacity={0.9} onPress={showLoginScreen}>
          <OneDexText text="0x" fontSize={12} fontWeight="700" color="#FFFFFF" lineHeight={16} />
        </TouchableOpacity>
        <View style={addressRowStyle}>
          <OneDexText text="0x71...39A2" fontSize={14} fontWeight="700" color="#0F172B" lineHeight={20} />
          <View style={copyIconWrapStyle}>
            <Ionicons name="copy-outline" size={14} color="#90A1B9" />
          </View>
        </View>
      </View>

      <HeaderIconButton icon="settings-outline" color="#45556C" />
    </View>
  </>
}

