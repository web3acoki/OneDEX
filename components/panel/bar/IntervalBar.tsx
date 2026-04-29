import React from "react"
import { Pressable, View, type ViewStyle } from "react-native"
import { OneDexText } from "@/components/content/general/OneDexText"

type MarketIntervalValue = "5m" | "1h" | "1d" | "1w"

type IntervalBarProps = {
  active: MarketIntervalValue
  onChange: (next: MarketIntervalValue) => void
}

const OPTIONS: Array<{ label: string; value: MarketIntervalValue }> = [
  { label: "5m", value: "5m" },
  { label: "1h", value: "1h" },
  { label: "D", value: "1d" },
  { label: "W", value: "1w" },
]

export function IntervalBar({ active, onChange }: IntervalBarProps) {
  const barStyle: ViewStyle = {
    marginTop: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  }

  const itemStyle: ViewStyle = {
    height: 30,
    paddingHorizontal: 12,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  }

  const itemActiveStyle: ViewStyle = {
    backgroundColor: "#0F172B",
    borderColor: "#0F172B",
  }

  return <>
    <View style={barStyle}>
      {OPTIONS.map((item) => (
        <Pressable key={item.value} style={[itemStyle, active === item.value ? itemActiveStyle : null]} onPress={() => onChange(item.value)}>
          <OneDexText text={item.label} fontSize={12} lineHeight={16} color={active === item.value ? "#FFFFFF" : "#62748E"} />
        </Pressable>
      ))}
    </View>
  </>
}

export type { MarketIntervalValue }

