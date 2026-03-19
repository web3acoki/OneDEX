import React from "react";
import { View, type ViewStyle } from "react-native";
import { OneDexText } from "@/components/content/OneDexText";
import { subscribeTop20Mids } from "@/services/hyperliquid";

export function Assets() {
  const [lines, setLines] = React.useState<string[]>(["Loading Hyperliquid prices..."]);

  React.useEffect(() => {
    const unsubscribe = subscribeTop20Mids(
      (nextLines) => setLines(nextLines),
      (message) => setLines([message])
    );
    return unsubscribe;
  }, []);

  const style: ViewStyle = {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 148,
    pointerEvents: "none",
  };

  return (
    <View style={style}>
      {lines.map((line) => (
        <OneDexText key={line} text={line} fontSize={10} color="#62748E" />
      ))}
    </View>
  );
}
