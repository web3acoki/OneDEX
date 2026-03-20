import React from "react"
import { View, type ViewStyle } from "react-native"
import { OneDexText } from "@/components/content/OneDexText"
import { HeaderIconButton } from "@/components/content/HeaderIconButton"

export function TradeHeader() {
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
          <OneDexText text="Markets" fontSize={24} fontWeight="700" color="#0F172B" lineHeight={32} />
        </View>
        <View style={positionsBtnStyle}>
          <View style={positionsInnerStyle}>
            <OneDexText text="Positions" fontSize={24} fontWeight="700" color="#90A1B9" lineHeight={32} />
          </View>
        </View>
      </View>

      <HeaderIconButton icon="search" size={20} color="#62748E" />
    </View>
  </>
}

