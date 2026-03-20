type AuthScreen = "none" | "login"

let authScreen: AuthScreen = "none"
const listeners = new Set<(next: AuthScreen) => void>()

export function getAuthScreen(): AuthScreen {
  return authScreen
}

export function showLoginScreen() {
  if (authScreen === "login") return
  authScreen = "login"
  listeners.forEach((listener) => listener(authScreen))
}

export function clearAuthScreen() {
  if (authScreen === "none") return
  authScreen = "none"
  listeners.forEach((listener) => listener(authScreen))
}

export function subscribeAuthScreen(listener: (next: AuthScreen) => void): () => void {
  listeners.add(listener)
  listener(authScreen)

  return () => {
    listeners.delete(listener)
  }
}

export type { AuthScreen }

