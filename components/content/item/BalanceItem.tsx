import React from "react"
import { View, type ViewStyle } from "react-native"
import { OneDexText } from "@/components/content/general/OneDexText"
import { getMarketFullName } from "@/components/content/item/MarketItem"

type BalanceItemProps = {
  item: {
    symbol: string
    totalBalanceValue: string
    availableBalanceValue: string
    usdcValueValue: string
    pnlValue: string
    pnlColor: string
  }
  isFirst?: boolean
}

export function BalanceItem({ item, isFirst = false }: BalanceItemProps) {
  const avatarLetter = item.symbol.slice(0, 1).toUpperCase()
  const title = item.symbol
  const subtitle = getMarketFullName(item.symbol)

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
    minHeight: 148,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
  }

  const topRowStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  }

  const leftRowStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  }

  const avatarStyle: ViewStyle = {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  }

  const labelsColStyle: ViewStyle = {
    flex: 1,
    justifyContent: "center",
  }

  const subtitleWrapStyle: ViewStyle = {
    marginTop: 2,
  }

  const sectionWrapStyle: ViewStyle = {
    marginTop: 8,
  }

  const labelRowStyle: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }

  const valueRowStyle: ViewStyle = {
    marginTop: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }

  return <>
    <View style={rowStyle}>
      <View style={topRowStyle}>
        <View style={leftRowStyle}>
          <View style={avatarStyle}>
            <OneDexText text={avatarLetter} fontSize={16} color="#0F172B" />
          </View>
          <View style={labelsColStyle}>
            <OneDexText text={title} fontSize={16} lineHeight={24} />
            <View style={subtitleWrapStyle}>
              <OneDexText text={subtitle} fontSize={12} fontWeight="500" color="#90A1B9" lineHeight={16} />
            </View>
          </View>
        </View>
      </View>

      <View style={sectionWrapStyle}>
        <View style={labelRowStyle}>
          <OneDexText text="Total Balance" fontSize={12} fontWeight="500" color="#90A1B9" lineHeight={16} />
          <OneDexText text="Available Balance" fontSize={12} fontWeight="500" color="#90A1B9" lineHeight={16} />
        </View>
        <View style={valueRowStyle}>
          <OneDexText text={item.totalBalanceValue} fontSize={14} fontWeight="700" color="#0F172B" lineHeight={20} />
          <OneDexText text={item.availableBalanceValue} fontSize={14} fontWeight="700" color="#0F172B" lineHeight={20} />
        </View>
      </View>

      <View style={sectionWrapStyle}>
        <View style={labelRowStyle}>
          <OneDexText text="USDC Value" fontSize={12} fontWeight="500" color="#90A1B9" lineHeight={16} />
          <OneDexText text="PNL(ROE%)" fontSize={12} fontWeight="500" color="#90A1B9" lineHeight={16} />
        </View>
        <View style={valueRowStyle}>
          <OneDexText text={item.usdcValueValue} fontSize={14} fontWeight="700" color="#0F172B" lineHeight={20} />
          <OneDexText text={item.pnlValue} fontSize={14} fontWeight="700" color={item.pnlColor} lineHeight={20} />
        </View>
      </View>
    </View>
  </>
}

