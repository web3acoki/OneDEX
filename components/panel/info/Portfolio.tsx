import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, type ViewStyle } from "react-native";
import { OneDexButton } from "@/components/content/general/OneDexButton";
import { OneDexText } from "@/components/content/general/OneDexText";
import { useEmbeddedEthereumWallet } from "@privy-io/expo";
import { fetchPortfolioView, getPortfolioView } from "@/services/hyperliquid";

export function Portfolio() {
  const { wallets } = useEmbeddedEthereumWallet();
  const walletAddress = wallets[0]?.address ?? "";
  const [view, setView] = React.useState(() => getPortfolioView(walletAddress));
  React.useEffect(() => { if (!walletAddress) return; void fetchPortfolioView(walletAddress).then((next) => setView((prev) => prev.portfolioValue === next.portfolioValue && prev.pnlPercent === next.pnlPercent ? prev : next)); }, [walletAddress]);
  const [intPart, fractionPart = "00"] = view.portfolioValue.toFixed(2).split(".");
  const pnlIsPositive = view.pnlPercent >= 0;

  const containerStyle: ViewStyle = {
    paddingHorizontal: 24,
  };

  const titleRowStyle: ViewStyle = {
    height: 24,
    flexDirection: "row",
    alignItems: "center",
  };

  const titleIconStyle: ViewStyle = {
    marginLeft: 8,
  };

  const valueRowStyle: ViewStyle = {
    marginTop: 4,
    height: 49,
    flexDirection: "row",
    alignItems: "flex-end",
  };

  const changeRowStyle: ViewStyle = {
    marginTop: 4,
    height: 20,
    flexDirection: "row",
    alignItems: "center",
  };

  const buttonRowStyle: ViewStyle = {
    marginTop: 24,
    flexDirection: "row",
    height: 48,
  };

  const buttonCellStyle: ViewStyle = {
    flex: 1,
  };

  const leftButtonCellStyle: ViewStyle = {
    marginRight: 12,
  };

  return <>
    <View style={containerStyle}>

      <View style={titleRowStyle}>
        <OneDexText text="Portfolio Value" fontSize={16} />
        <View style={titleIconStyle}>
          <Ionicons name="eye-outline" size={16} color="#0F172B" />
        </View>
      </View>

      <View style={valueRowStyle}>
        <OneDexText text={`$${intPart}`} fontSize={48} fontWeight="800" lineHeight={48} />
        <OneDexText text={`.${fractionPart}`} fontSize={30} fontWeight="800" color="#90A1B9" lineHeight={36} />
      </View>

      <View style={changeRowStyle}>
        <Ionicons name={pnlIsPositive ? "trending-up" : "trending-down"} size={12} color={pnlIsPositive ? "#00BC7D" : "#EF4444"} />
        <OneDexText text={`${pnlIsPositive ? "+" : ""}${view.pnlPercent.toFixed(2)}%`} color={pnlIsPositive ? "#00BC7D" : "#EF4444"} marginLeft={6} />
        <OneDexText text="Today" color="#62748E" marginLeft={6} />
      </View>

      <View style={buttonRowStyle}>
        <View style={[buttonCellStyle, leftButtonCellStyle]}>
          <OneDexButton label="Deposit" />
        </View>
        <View style={buttonCellStyle}>
          <OneDexButton label="Withdraw" backgroundColor="#FFFFFF" borderColor="#E2E8F0" labelColor="#0F172B" />
        </View>
      </View>

    </View>
  </>
}