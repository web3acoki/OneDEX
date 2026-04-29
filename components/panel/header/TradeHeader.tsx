import React from "react"
import { Pressable, View, type ViewStyle } from "react-native"
import { OneDexText } from "@/components/content/general/OneDexText"
import { HeaderButton } from "@/components/content/general/HeaderButton"
type TradeMainTab = "Markets" | "Positions"

type TradeHeaderProps = {
  onPressSearch: () => void
  active: TradeMainTab
  onPressMarkets: () => void
  onPressPositions: () => void
}

export function TradeHeader({ onPressSearch, active, onPressMarkets, onPressPositions }: TradeHeaderProps) {
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
    gap: 16,
  }

  const marketsBtnStyle: ViewStyle = {
    width: 98,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  }

  const positionsBtnStyle: ViewStyle = {
    width: 141,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  }

  const positionsInnerStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  }

  return <>
    <View style={headerStyle}>
      <View style={leftGroupStyle}>
        <View style={marketsBtnStyle}>
          <Pressable onPress={onPressMarkets}>
            <OneDexText text="Markets" fontSize={24} fontWeight="700" color={active === "Positions" ? "#90A1B9" : "#0F172B"} lineHeight={32} />
          </Pressable>
        </View>
        <View style={positionsBtnStyle}>
          <View style={positionsInnerStyle}>
            <Pressable onPress={onPressPositions}>
              <OneDexText text="Positions" fontSize={24} fontWeight="700" color={active === "Positions" ? "#0F172B" : "#90A1B9"} lineHeight={32} />
            </Pressable>
          </View>
        </View>
      </View>

      <HeaderButton name="search" onPress={onPressSearch} />
    </View>
  </>
}

