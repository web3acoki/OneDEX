import React from "react"
import { View, type ViewStyle } from "react-native"
import { useLoginWithEmail } from "@privy-io/expo"
import { OneDexText } from "@/components/content/OneDexText"
import { OneDexButton } from "@/components/content/OneDexButton"
import { OneDexInput } from "@/components/content/OneDexInput"
import { useLoginMode } from "@/components/page/Login"

export function LoginEmail() {
  const { setMode } = useLoginMode()
  const { sendCode, loginWithCode } = useLoginWithEmail()

  const [email, setEmail] = React.useState("")
  const [code, setCode] = React.useState("")
  const [codeSent, setCodeSent] = React.useState(false)

  const columnWrapStyle: ViewStyle = {
    alignItems: "center",
    alignSelf: "center",
    //marginBottom: 79.992,
  }

  const cellStyle: ViewStyle = {
    width: 329.4,
    height: 64,
    marginTop: 12,
  }

  function sendCodeSuccess() {
    setCodeSent(true)
  }

  return <>
    <View style={columnWrapStyle}>
      <View style={cellStyle}>
        <OneDexInput value={email} onChangeText={setEmail} placeholder="Email" inputMode="email"/>
      </View>
      
      <View style={cellStyle}>
        <OneDexInput value={code} onChangeText={setCode} placeholder="Code" inputMode="numeric"/>
      </View>

      <View style={cellStyle}>
        <OneDexButton label={codeSent ? "Resend Code" : "Send Code"} 
        backgroundColor={codeSent ? "#00BC7D" : "#0F172B"}
        onPress={async () => { await sendCode({ email }); sendCodeSuccess() }}/>
      </View>

      <View style={cellStyle}>
        <OneDexButton label="Login" onPress={() => loginWithCode({ code: code, email })}/>
      </View>

      <View style={cellStyle}>
        <OneDexButton label="Back" backgroundColor="#FFFFFF" labelColor="#0F172B" iconColor="#0F172B" iconName="chevron-back"onPress={() => setMode("buttons")}/>
      </View>

    </View>
  </>
}
