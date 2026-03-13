import { Stack } from "expo-router";

import { HomeScreen } from "@/components/home-screen";

export default function IndexRoute() {
  return (
    <>
      <Stack.Screen options={{ title: "Tinywins" }} />
      <HomeScreen />
    </>
  );
}
