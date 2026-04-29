import React from "react"
import { TouchableOpacity, type ViewStyle } from "react-native"
import { OneDexText } from "@/components/content/general/OneDexText"

type CategoryButtonProps = {
  label: "All" | "Watchlist"
  active: boolean
  width: number
  onPress: () => void
}

const getButtonStyle = (active: boolean, width: number): ViewStyle => ({
  width,
  height: 30,
  borderRadius: 15,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: active ? "#0F172B" : "#FFFFFF",
  borderWidth: 1,
  borderColor: active ? "#0F172B" : "#E2E8F0",
})

const getLabelColor = (active: boolean) => (active ? "#FFFFFF" : "#62748E")

export function CategoryButton({ label, active, width, onPress }: CategoryButtonProps) {
  return <>
    <TouchableOpacity style={getButtonStyle(active, width)} activeOpacity={0.9} onPress={onPress}>
      <OneDexText text={label} fontSize={12} fontWeight="700" color={getLabelColor(active)} lineHeight={16} />
    </TouchableOpacity>
  </>
}

