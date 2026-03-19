## Code Style Guide

All code in this project MUST:

- **Prioritize readability**: avoid obscure language features or clever tricks, and do not add conditional logic that has no real effect.
- **Use English only** for names, comments, logs, documentation, and user-facing text.
- **Page structure**: no default top header; elements under `components/page` should reuse scripts from `components/panel`.
- **Structure components**: use `components/panel` for layout containers (panels) and `components/content` for reusable content elements.
- **Apply Figma**: map sizes/spacing outside-in — panel → container → content.
- **One-line code when clear**: when a method or expression can be written clearly in one line, avoid splitting it unnecessarily; keep main renders compact yet readable.
- **Styles (const)**: do not use `StyleSheet.create`; define styles as simple `const` objects inside the component file.
- **OneDex components**: do not use `Button` / `Text`; do not write `TextStyle`. Use `OneDexButton` / `OneDexText`.
- **Prefer defaults**: for OneDex components, prefer defaults when possible (e.g., `OneDexText` defaults to `fontWeight="700"` and `color="#0F172B"`).
- **Separate API files**: place API request logic in dedicated scripts (for example `services/hyperliquid/*`); page or panel components should only call them, not inline implementations.
- **Name APIs by domain**: split API files by business domain (for example `market`, `account`, `order`) to keep clear responsibilities.
- **Subscription initialization**: do not initialize realtime subscriptions (WebSocket) inside frequently mounted/unmounted page components; use a global singleton or shared state to avoid repeated requests and reconnects when switching tabs.
- **File names**: do not append suffixes like `Page`, `Section`, or `Panel` to filenames.

