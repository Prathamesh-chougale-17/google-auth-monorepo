import { Ionicons } from "@expo/vector-icons";
import { Chip, Surface, useThemeColor } from "heroui-native";
import { Text, View } from "react-native";

type HomeHeroProps = {
  isConnected: boolean;
  isLoading: boolean;
  sessionName?: string | null;
};

export function HomeHero({ isConnected, isLoading, sessionName }: HomeHeroProps) {
  const accentForegroundColor = useThemeColor("accent-foreground");

  const statusLabel = isLoading ? "Checking" : isConnected ? "Connected" : "Offline";
  const statusColor = isConnected ? "success" : "danger";
  const headline = sessionName ? `Welcome back, ${sessionName}.` : "A calmer native workspace.";
  const supportingCopy = sessionName
    ? "Everything important now lives on one focused home screen with cleaner navigation."
    : "Sign in with Google, keep the app in sync with web, and leave the starter-kit clutter behind.";

  return (
    <Surface variant="secondary" className="rounded-3xl overflow-hidden">
      <View className="gap-5 p-5">
        <View className="flex-row items-start justify-between gap-4">
          <View className="flex-1 gap-3">
            <View className="flex-row items-center gap-3">
              <View className="h-12 w-12 rounded-2xl bg-accent items-center justify-center">
                <Ionicons name="sparkles" size={22} color={accentForegroundColor} />
              </View>
              <Chip color={statusColor} size="sm" variant="secondary">
                <Chip.Label>{statusLabel}</Chip.Label>
              </Chip>
            </View>

            <View className="gap-2">
              <Text className="text-foreground text-2xl font-semibold">{headline}</Text>
              <Text className="text-muted text-sm leading-6">{supportingCopy}</Text>
            </View>
          </View>
        </View>

        <View className="flex-row gap-3">
          <View className="flex-1 rounded-3xl bg-background p-4">
            <Text className="text-muted text-xs uppercase tracking-widest">Auth</Text>
            <Text className="text-foreground text-base font-semibold mt-1">Google only</Text>
            <Text className="text-muted text-sm mt-2 leading-5">
              One sign-in path across native and web.
            </Text>
          </View>

          <View className="flex-1 rounded-3xl bg-background p-4">
            <Text className="text-muted text-xs uppercase tracking-widest">Layout</Text>
            <Text className="text-foreground text-base font-semibold mt-1">Single flow</Text>
            <Text className="text-muted text-sm mt-2 leading-5">
              No drawer, no noisy tabs, just the essentials.
            </Text>
          </View>
        </View>
      </View>
    </Surface>
  );
}
