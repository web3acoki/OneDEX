import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, type ViewStyle } from "react-native";
import { OneDexText } from "@/components/content/general/OneDexText";

type BottomBarItemProps = {
  label: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  active: boolean;
  onPress: () => void;
};

export function BottomBarItem({ label, icon, active, onPress }: BottomBarItemProps) {

  const itemStyle: ViewStyle = {
    height: 51,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  };

  const iconStyle: ViewStyle = {
    height: 24,
    marginBottom: 4,
    justifyContent: "center",
  };

  return <>
    <TouchableOpacity style={itemStyle} activeOpacity={0.8} onPress={onPress}>
      <View style={iconStyle}>
        <Ionicons name={icon} size={24} color={active ? "#0F172B" : "#90A1B9"} />
      </View>
      <OneDexText text={label} fontSize={10} fontWeight={active ? "500" : undefined} color={active ? "#0F172B" : "#90A1B9"} />
    </TouchableOpacity>
  </>
}