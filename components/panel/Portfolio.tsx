import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, type ViewStyle } from "react-native";
import { OneDexButton } from "@/components/content/OneDexButton";
import { OneDexText } from "@/components/content/OneDexText";

export function Portfolio() {
  const containerStyle: ViewStyle = {
    height: 173,
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

  return (
    <View style={containerStyle}>
      <View style={titleRowStyle}>
        <OneDexText text="Portfolio Value" fontSize={16} />
        <View style={titleIconStyle}>
          <Ionicons name="eye-outline" size={16} color="#0F172B" />
        </View>
      </View>

      <View style={valueRowStyle}>
        <OneDexText text="$1,240" fontSize={48} fontWeight="800" lineHeight={48} />
        <OneDexText text=".50" fontSize={30} fontWeight="800" color="#90A1B9" lineHeight={36} />
      </View>

      <View style={changeRowStyle}>
        <Ionicons name="trending-up" size={12} color="#00BC7D" />
        <OneDexText text="+12.4%" color="#00BC7D" marginLeft={6} />
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
  );
}