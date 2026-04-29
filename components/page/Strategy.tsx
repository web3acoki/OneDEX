import React from "react";
import { ScrollView, View, type ViewStyle } from "react-native";
import { StrategyHeader } from "@/components/panel/header/StrategyHeader";

export default function Strategy() {
  return <>
    <StrategyHeader />
    <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
      <View style={{ height: 1 }} />
    </ScrollView>
  </>
}


