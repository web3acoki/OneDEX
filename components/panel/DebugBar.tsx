import React from "react";
import { View, type ViewStyle } from "react-native";
import { OneDexText } from "@/components/content/OneDexText";
import { usePrivy } from "@privy-io/expo";

export function DebugBar() {
  const { isReady, user } = usePrivy();
  const version = "v0.0.44";

  const style: ViewStyle = {
    position: "absolute",
    left: 24,
    right: 24,
    top: 8,
    height: 20,
    justifyContent: "center",
    pointerEvents: "none",
  };

  const text=`${version} ${isReady ? "Privy Ready" : "Privy Not Ready"} ${user ? "User Ready" : "User Not Ready"}`;

  return <>
    <View style={style}>
      <OneDexText text={text} fontSize={10} color="#90A1B9"/>
    </View>
  </>
}