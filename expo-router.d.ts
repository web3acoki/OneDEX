import "expo-router";

declare module "expo-router" {
  export namespace ExpoRouter {
    interface __routes {
      href:
        | "/"
        | "/_sitemap";
    }
  }
}

