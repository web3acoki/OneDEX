import React from "react";
import { View, type ViewStyle } from "react-native";
import { OneDexText } from "@/components/content/OneDexText";
import { usePrivy } from "@privy-io/expo";

export function DebugBar() {
  const { isReady, user } = usePrivy();
  const version = "v0.0.12";

  const style: ViewStyle = {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 108,
    height: 20,
    justifyContent: "center",
    pointerEvents: "none",
  };

  return (
    <View style={style}>
      <OneDexText text={version} fontSize={10} />
      <OneDexText text={isReady ? "Privy Ready" : "Privy Not Ready"} fontSize={10} />
      <OneDexText text={user ? "User Ready" : "User Not Ready"} fontSize={10} />
    </View>
  );
}