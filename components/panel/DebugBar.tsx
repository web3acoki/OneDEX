import React from "react";
import { View, type ViewStyle } from "react-native";
import { OneDexText } from "@/components/content/OneDexText";
import { usePrivy } from "@privy-io/expo";

export function DebugBar() {
  const { isReady, user } = usePrivy();
  const version = "v0.0.65";
  const debugMode = true;

  const style: ViewStyle = {
    position: "absolute",
    marginTop: 8,
    marginHorizontal: 24,
    minHeight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  };

  const text=`${version} ${isReady ? "Privy Ready" : "Privy Not Ready"} ${user ? "User Ready" : "User Not Ready"}`;

  return <>
    {debugMode && <View style={style}>
      <OneDexText text={text} fontSize={10} color="#90A1B9"/>
    </View>
    }
  </>
}