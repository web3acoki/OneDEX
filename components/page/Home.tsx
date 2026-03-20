import React from "react";
import { ScrollView, type ViewStyle } from "react-native";
import { HomeHeader } from "@/components/panel/HomeHeader";
import { Portfolio } from "@/components/panel/Portfolio";
import { Markets } from "@/components/panel/Markets";
import { useWatchlistSymbols } from "@/hooks/useWatchlistSymbols";

type HomeProps = {
  onJumpToTradeWatchlist: () => void
}

export default function Home({ onJumpToTradeWatchlist }: HomeProps) {
  const watchlistSymbols = useWatchlistSymbols();

  return <>
    <HomeHeader />
    <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
      <Portfolio />
      <Markets
        symbolFilter={watchlistSymbols}
        watchlistHeaderRightAction={onJumpToTradeWatchlist}
      />
    </ScrollView>
  </>
}