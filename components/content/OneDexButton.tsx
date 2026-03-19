import React from "react";
import { GestureResponderEvent, TouchableOpacity, type ViewStyle } from "react-native";
import { OneDexText } from "@/components/content/OneDexText";

type OneDexButtonProps = {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  backgroundColor?: ViewStyle["backgroundColor"];
  borderColor?: ViewStyle["borderColor"];
  labelColor?: string;
};

export function OneDexButton({ label, onPress, backgroundColor , borderColor, labelColor}: OneDexButtonProps) {
  const buttonStyle: ViewStyle = {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: backgroundColor ? backgroundColor : "#0F172B",
    borderWidth: borderColor ? 1 : 0,
    borderColor,
  };

  return (
    <TouchableOpacity style={buttonStyle} activeOpacity={0.9} onPress={onPress}>
      <OneDexText text={label} color={labelColor ? labelColor : "#FFFFFF"} />
    </TouchableOpacity>
  );
}

