## Code Style Guide

All code in this project MUST:

- **Prioritize readability**: avoid obscure language features or clever tricks, and do not add conditional logic that has no real effect.
- **Use English only** for names, comments, logs, documentation, and user-facing text.
- **Page structure**: no default top header; elements under `components/page` should reuse scripts from `components/panel`.
- **Header alignment**: in `components/panel/*Header.tsx` use normal layout (no `position: "absolute"`), and keep `height: 104` with `alignItems: "flex-start"` + `paddingTop: 48`.
- **Self-contained panel layout**: outer spacing and sizing that belong to a panel live inside that panel (e.g. `Brand` top padding); do not wrap a panel in `page` with a style-only `View`.
- **Panel positioning**: prefer `marginTop` for layout positioning in `components/panel`; avoid `top` / `bottom` whenever possible.
- **No absolute positioning**: do not use `position: "absolute"` for layout implementation (especially in `page` / `panel`); prefer normal document flow and spacing.
- **Structure components**: use `components/panel` for layout containers (panels) and `components/content` for reusable content elements.
- **Apply Figma**: map sizes/spacing outside-in — panel → container → content.
- **One-line code when clear**: when a method or expression can be written clearly in one line, avoid splitting it unnecessarily; keep main renders compact yet readable.
- **Fragment returns**: first line `return <>`, last line `</>`, children on new lines; no `()` wrapper and no `;` after `</>`; use `React.Fragment` when a key is needed.
- **Complex return formatting**: when a `return <> ... </>` is complex (many UI nodes), separate each UI node line with a blank line to improve readability (follow `Portfolio` / `Brand` style).
- **Styles (const)**: do not use `StyleSheet.create`; define styles as simple `const` objects inside the component file.
- **OneDex components**: do not use `Button` / `Text`; do not write `TextStyle`. Use `OneDexButton` / `OneDexText`.
- **Prefer defaults**: for OneDex components, prefer defaults when possible (e.g., `OneDexText` defaults to `fontWeight="700"` and `color="#0F172B"`).
- **Separate API files**: place API request logic in dedicated scripts (for example `services/hyperliquid/*`); page or panel components should only call them, not inline implementations.
- **Name APIs by domain**: split API files by business domain (for example `market`, `account`, `order`) to keep clear responsibilities.
- **Subscription initialization**: do not initialize realtime subscriptions (WebSocket) inside frequently mounted/unmounted page components; use a global singleton or shared state to avoid repeated requests and reconnects when switching tabs.
- **File names**: do not append suffixes like `Page`, `Section`, or `Panel` to filenames.

