import React from "react"
import { Brand } from "@/components/panel/Brand"
import { LoginButtons } from "@/components/panel/LoginButtons"
import { LoginEmail } from "@/components/panel/LoginEmail"
import { LoginPolicy } from "@/components/panel/LoginPolicy"

type LoginMode = "buttons" | "email"

type LoginModeContextValue = {
  setMode: (next: LoginMode) => void
}

export const LoginModeContext = React.createContext<LoginModeContextValue | null>(null)

export function useLoginMode(): LoginModeContextValue {
  const ctx = React.useContext(LoginModeContext);
  if (!ctx) throw new Error("useLoginMode must be used within LoginModeContext.Provider");
  return ctx;
}

export default function Login() {
  const [mode, setMode] = React.useState<LoginMode>("buttons")

  return <>
    <LoginModeContext.Provider value={{ setMode }}>
      <Brand />
      {mode === "buttons" ? <LoginButtons /> : <LoginEmail />}
      <LoginPolicy />
    </LoginModeContext.Provider>
  </>
}
