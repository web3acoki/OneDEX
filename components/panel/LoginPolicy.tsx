import React from "react"
import { View, type ViewStyle } from "react-native"
import { OneDexText } from "@/components/content/OneDexText"

const policyWrapStyle: ViewStyle = {
  //marginTop: 0,
  //marginBottom: 79.992,
  //position: "absolute",
  //bottom:80,
  //width: 259.983,
  alignItems: "center",
  alignSelf: "center",
  marginTop: 12,
}

export function LoginPolicy() {
  return <>
    <View style={policyWrapStyle}>
      <OneDexText text="By continuing, you agree to OneDEX's" fontSize={13} fontWeight="500" color="#90A1B9"/>
      <OneDexText text="Terms of Service and" fontSize={16} fontWeight="500" />
      <OneDexText text="Privacy Policy" fontSize={16} fontWeight="500" />
    </View>
  </>
}

