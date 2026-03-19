import React from "react";
import { SafeAreaView, View, type ViewStyle } from "react-native";
import { OneDexText } from "@/components/content/OneDexText";

export default function Wallet() {
  const safeAreaStyle: ViewStyle = {
    flex: 1,
    backgroundColor: "#F8FAFC",
  };

  const contentStyle: ViewStyle = {
    paddingTop: 112,
    paddingHorizontal: 24,
  };

  return (
    <SafeAreaView style={safeAreaStyle}>
      <View style={contentStyle}>
        <OneDexText text="Wallet" fontSize={24} fontWeight="800" />
      </View>
    </SafeAreaView>
  );
}


