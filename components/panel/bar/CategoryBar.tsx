import React from "react"
import { View, type ViewStyle } from "react-native"
import { CategoryButton } from "@/components/content/general/CategoryButton"

export type ActiveCategory = "All" | "Watchlist"

const BUTTON_WIDTHS: Record<ActiveCategory, number> = {
  All: 50,
  Watchlist: 90,
}

type CategoryBarProps = {
  active: ActiveCategory
  onChange: (next: ActiveCategory) => void
}

export function CategoryBar({ active, onChange }: CategoryBarProps) {
  const barStyle: ViewStyle = {
    marginTop: 16,
    marginHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  }

  return <>
    <View style={barStyle}>
      <CategoryButton label="All" active={active === "All"} width={BUTTON_WIDTHS.All} onPress={() => onChange("All")} />
      <CategoryButton label="Watchlist" active={active === "Watchlist"} width={BUTTON_WIDTHS.Watchlist} onPress={() => onChange("Watchlist")} />
    </View>
  </>
}