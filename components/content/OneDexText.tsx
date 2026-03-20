import React from "react";
import { Text, type TextStyle } from "react-native";

type OneDexTextProps = {
  text: string;
  fontSize?: number;
  fontWeight?: TextStyle["fontWeight"];
  color?: string;
  marginLeft?: number;
  marginBottom?: number;
  lineHeight?: number;
  textAlign?: TextStyle["textAlign"];
};

export function OneDexText({ text, fontSize, fontWeight, color, marginLeft, marginBottom, lineHeight, textAlign }: OneDexTextProps) {
  const style: TextStyle = {
    fontSize: fontSize ?? 14,
    fontWeight: fontWeight ?? "700",
    color: color ?? "#0F172B",
    marginLeft,
    marginBottom,
    lineHeight,
    textAlign,
  };

  return <Text style={style}>{text}</Text>
}

