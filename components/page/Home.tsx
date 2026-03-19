import React from "react";
import { SafeAreaView, ScrollView, type ViewStyle } from "react-native";
import { HomeHeader } from "@/components/panel/HomeHeader";
import { Portfolio } from "@/components/panel/Portfolio";
import { Assets } from "@/components/panel/Assets";

export default function Home() {
  const safeAreaStyle: ViewStyle = {
    flex: 1,
    backgroundColor: "#F8FAFC",
  };

  const contentStyle: ViewStyle = {
    paddingTop: 112,
    paddingBottom: 140,
  };

  return (
    <SafeAreaView style={safeAreaStyle}>
      <HomeHeader />
      <ScrollView contentContainerStyle={contentStyle}>
        <Portfolio />
      </ScrollView>
      <Assets />
    </SafeAreaView>
  );
}


