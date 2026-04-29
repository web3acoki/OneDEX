import React from "react"
import { View, type ViewStyle } from "react-native"
import { OneDexButton } from "@/components/content/general/OneDexButton"
import { OneDexText } from "@/components/content/general/OneDexText"
import type { PositionItemView } from "@/services/hyperliquid/clearinghouseState"

type PositionItemProps = {
  item: PositionItemView
  isFirst?: boolean
}

export function PositionItem({ item, isFirst = false }: PositionItemProps) {
  const rowStyle: ViewStyle = {
    marginTop: isFirst ? 8 : 12,
    marginHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  }

  const topRowStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  }

  const leftTopStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  }

  const greenBarStyle: ViewStyle = {
    width: 6,
    height: 24,
    borderRadius: 999,
    backgroundColor: "#00BC7D",
  }

  const tagStyle: ViewStyle = {
    backgroundColor: "#ECFDF5",
    borderRadius: 4,
    paddingHorizontal: 6,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  }

  const metricsRowStyle: ViewStyle = {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  }

  const metricColStyle: ViewStyle = {
    width: "48%",
  }

  const rightMetricColStyle: ViewStyle = {
    width: "48%",
    alignItems: "flex-end",
  }

  const actionsRowStyle: ViewStyle = {
    marginTop: 12,
    flexDirection: "row",
    height: 32,
    gap: 8,
  }

  const actionCellStyle: ViewStyle = {
    flex: 1,
  }

  return <>
    <View style={rowStyle}>
      <View style={topRowStyle}>
        <View style={leftTopStyle}>
          <View style={greenBarStyle} />
          <OneDexText text={`${item.symbol}-USD`} fontSize={30 / 1.6667} fontWeight="700" lineHeight={28} />
          <View style={tagStyle}>
            <OneDexText text={item.leverageText} fontSize={12} fontWeight="700" color="#009966" lineHeight={16} />
          </View>
        </View>
        <OneDexText text={item.pnlText} fontSize={14} fontWeight="700" color={item.pnlColor} lineHeight={20} />
      </View>

      <View style={metricsRowStyle}>
        <View style={metricColStyle}>
          <OneDexText text="Size" fontSize={12} fontWeight="500" color="#90A1B9" lineHeight={16} />
          <OneDexText text={item.sizeText} fontSize={14} fontWeight="700" color="#0F172B" lineHeight={20} marginBottom={0} />
        </View>
        <View style={rightMetricColStyle}>
          <OneDexText text="Entry Price" fontSize={12} fontWeight="500" color="#90A1B9" lineHeight={16} />
          <OneDexText text={item.entryPriceText} fontSize={14} fontWeight="700" color="#0F172B" lineHeight={20} />
        </View>
      </View>

      <View style={actionsRowStyle}>
        <View style={actionCellStyle}>
          <OneDexButton label="TP/SL" height={32} backgroundColor="#F1F5F9" labelColor="#45556C" />
        </View>
        <View style={actionCellStyle}>
          <OneDexButton label="Close" height={32} backgroundColor="#0F172B" />
        </View>
      </View>
    </View>
  </>
}

