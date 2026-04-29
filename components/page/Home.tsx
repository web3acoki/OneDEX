import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, View, type ViewStyle } from "react-native";
import { OneDexText } from "@/components/content/general/OneDexText";
import { HomeHeader } from "@/components/panel/header/HomeHeader";
import { MarketItems } from "@/components/panel/items/MarketItems";
import { Portfolio } from "@/components/panel/info/Portfolio";
import { useWatchlistSymbols } from "@/hooks/useWatchlistSymbols";

type HomeProps = {
  onJumpToTradeWatchlist: () => void
  onPressSearch: () => void
}

export default function Home({ onJumpToTradeWatchlist, onPressSearch }: HomeProps) {
  const watchlistSymbols = useWatchlistSymbols();
  const watchlistHeaderStyle: ViewStyle = {
    marginTop: 24,
    marginHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const watchlistLeftStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
  };

  return <>
    <HomeHeader onPressSearch={onPressSearch} />
    <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
      <Portfolio />
      <View style={watchlistHeaderStyle}>
        <View style={watchlistLeftStyle}>
          <Ionicons name="star" size={20} color="#0F172B" />
          <OneDexText text="Watchlist" fontSize={18} fontWeight="700" color="#0F172B" lineHeight={28} marginLeft={8} />
        </View>
        <Pressable onPress={onJumpToTradeWatchlist}>
          <Ionicons name="chevron-forward" size={20} color="#0F172B" />
        </Pressable>
      </View>
      <MarketItems
        symbolFilter={watchlistSymbols}
      />
    </ScrollView>
  </>
}