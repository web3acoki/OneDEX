import React from "react";
import { GestureResponderEvent, TouchableOpacity, View, type ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { OneDexText } from "@/components/content/general/OneDexText";

type OneDexButtonProps = {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  backgroundColor?: ViewStyle["backgroundColor"];
  borderColor?: ViewStyle["borderColor"];
  labelColor?: string;
  iconColor?: string;
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
};

export function OneDexButton({ label, onPress, backgroundColor , borderColor, labelColor,iconColor, iconName }: OneDexButtonProps) {
  const buttonStyle: ViewStyle = {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: backgroundColor ? backgroundColor : "#0F172B",
    borderWidth: borderColor ? 1 : 0,
    borderColor,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  };

  const contentRowStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  }

  return <>
    <TouchableOpacity style={buttonStyle} activeOpacity={0.9} onPress={onPress}>
      {iconName ? <>
        <View style={contentRowStyle}>
          <Ionicons name={iconName} size={20} color={iconColor ?? "#FFFFFF"} />
          <OneDexText text={label} fontSize={16} lineHeight={24} color={labelColor ?? "#FFFFFF"} />
        </View>
      </> : <OneDexText text={label} fontSize={16} lineHeight={24} color={labelColor ?? "#FFFFFF"} />}
    </TouchableOpacity>
  </>
}

