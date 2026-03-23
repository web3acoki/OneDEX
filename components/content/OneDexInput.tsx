import React from "react"
import { TextInput, View, type ViewStyle } from "react-native"

type OneDexInputProps = {
  value: string
  onChangeText: (next: string) => void
  placeholder: string
  inputMode: "email" | "numeric" | "text"
  containerStyle?: ViewStyle
  children?: React.ReactNode
}

const inputWrapStyle: ViewStyle = {
  width: "100%",
  height: "100%",
  borderRadius: 20,
  backgroundColor: "#F8FAFC",
  borderWidth: 0,
  justifyContent: "center",
  position: "relative",
  paddingHorizontal: 16,
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 2,
}

export function OneDexInput({
  value,
  onChangeText,
  placeholder,
  inputMode,
  containerStyle,
  children,
}: OneDexInputProps) {
  return <>
    <View style={[inputWrapStyle, containerStyle]}>
      <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} inputMode={inputMode} style={{ flex: 1, padding: 0, margin: 0, color: "#0F172B" }} />
      {children}
    </View>
  </>
}

