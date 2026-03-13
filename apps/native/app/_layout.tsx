import "@/global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { HeroUINativeProvider, useThemeColor } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { ThemeToggle } from "@/components/theme-toggle";
import { AppThemeProvider } from "@/contexts/app-theme-context";
import { queryClient } from "@/utils/orpc";

function RootNavigator() {
  const foregroundColor = useThemeColor("foreground");
  const backgroundColor = useThemeColor("background");

  return (
    <Stack
      screenOptions={{
        headerTintColor: foregroundColor,
        headerStyle: {
          backgroundColor,
        },
        headerTitleStyle: {
          color: foregroundColor,
          fontWeight: "600",
        },
        headerShadowVisible: false,
        headerBackButtonDisplayMode: "minimal",
        contentStyle: {
          backgroundColor,
        },
        headerRight: () => <ThemeToggle />,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Tinywins" }} />
      <Stack.Screen name="modal" options={{ title: "Preview", presentation: "modal" }} />
    </Stack>
  );
}

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardProvider>
          <AppThemeProvider>
            <HeroUINativeProvider>
              <RootNavigator />
            </HeroUINativeProvider>
          </AppThemeProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
