## Process Document

The project flow follows the current implementation and stays concise, direct, and reusable.

- **Tech Stack and Entry**: Use Expo + Expo Router + React Native. The app entry is `entrypoint.js`, which loads polyfills first and then `expo-router/entry`.
- **Root Layout Flow**: `app/_layout.tsx` sets global `PrivyProvider` and `Stack`, and disables the default top header (`headerShown: false`).
- **Main Route Flow**: `app/index.tsx` is the main route. It checks `usePrivy().user`; show `Login` when not authenticated, otherwise show business screens.
- **Login Flow**: `components/page/Login.tsx` uses `useLoginWithEmail`; send verification code first (`sendCode`), then authenticate with email + code (`loginWithCode`).
- **Business Screen Switch Flow**: After login, `activeTab` controls switching between `Home`, `Trade`, `Strategy`, and `Wallet`.
- **Bottom Bar Flow**: `components/panel/BottomBar.tsx` renders the tab container, while `components/content/BottomBarItem.tsx` handles single-tab click behavior.
- **Market Fetch Flow**: `services/hyperliquid/market.ts` first fetches the top 20 symbols by HTTP, then subscribes to realtime prices via `allMids` WebSocket; `components/panel/Assets.tsx` only subscribes and renders, reusing the same subscription state across tab switches.

