import React from "react"
import { TouchableOpacity, View, type ViewStyle } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { OneDexText } from "@/components/content/OneDexText"

type WatchlistShortcutBarProps = {
  onPressRightArrow: () => void
}

export function WatchlistShortcutBar({ onPressRightArrow }: WatchlistShortcutBarProps) {
  const barStyle: ViewStyle = {
    marginTop: 16,
    marginHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }

  const leftGroupStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: 112.28,
    height: 27.99,
  }

  return <>
    <View style={barStyle}>
      <View style={leftGroupStyle}>
        <Ionicons name="star" size={20} color="#0F172B" />
        <OneDexText text="Watchlist" fontSize={18} fontWeight="700" color="#0F172B" lineHeight={28} />
      </View>

      <TouchableOpacity activeOpacity={0.8} onPress={onPressRightArrow}>
        <Ionicons
          name="chevron-up"
          size={20}
          color="#0F172B"
          style={{ transform: [{ rotate: "90deg" }] }}
        />
      </TouchableOpacity>
    </View>
  </>
}

