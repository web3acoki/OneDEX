import React from "react";
import { SafeAreaView, View, type ViewStyle } from "react-native";
import { Brand } from "@/components/panel/Brand";
import { useLoginWithEmail} from "@privy-io/expo";
import { OneDexButton } from "@/components/content/OneDexButton";
import { OneDexText } from "@/components/content/OneDexText";
import { useState } from "react";
import { TextInput } from "react-native";

export default function Login() {
    
  const {sendCode, loginWithCode} = useLoginWithEmail();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const safeAreaStyle: ViewStyle = {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  };

  const contentStyle: ViewStyle = {
    paddingTop: 144,
  };

  const buttonStyle: ViewStyle = {
    marginTop: 24,
    flexDirection: "row",
    height: 48,
    width: 327,
  };

  const buttonCellStyle: ViewStyle = {
    flex: 1,
  };

  const leftButtonCellStyle: ViewStyle = {
    marginRight: 12,
  };

  function sendCodeSuccess() {
    setCodeSent(true);
  }
  
  return (
    <SafeAreaView style={safeAreaStyle}>
      <View style={contentStyle}>
        <Brand />
      </View>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" inputMode="email"/>
      <TextInput value={code} onChangeText={setCode} placeholder="Code" inputMode="numeric"/>
      {codeSent && <OneDexText text="Code sent successfully" color="#00BC7D" />}
      <View style={buttonStyle}>
        <View style={[buttonCellStyle, leftButtonCellStyle]}>
          <OneDexButton label="Send Code" onPress={async () => {await sendCode({email});sendCodeSuccess();}}/>
        </View>
        <View style={buttonCellStyle}>
          <OneDexButton label="Login" onPress={() => loginWithCode({code: code, email})} />
        </View>
      </View>
      </SafeAreaView>
    );
}
