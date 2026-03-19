import React from "react";
import { Stack} from "expo-router";
import { PrivyProvider } from "@privy-io/expo";

export default function RootLayout() {
  return (
  <PrivyProvider appId="cmjksvwjy05n3l40c0s99jnse" clientId="client-WY6UFTXqXxDMXvaq1s5WkxJTK2wMFSCGZpNvGkvwa2j3V">
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index"/>
    </Stack>
  </PrivyProvider>
  );
}
