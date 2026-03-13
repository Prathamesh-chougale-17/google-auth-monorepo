import { Ionicons } from "@expo/vector-icons";
import { Card, Chip, Spinner, useThemeColor } from "heroui-native";
import { Text, View } from "react-native";

type SystemStatusCardProps = {
  endpointLabel: string;
  isConnected: boolean;
  isLoading: boolean;
};

export function SystemStatusCard({
  endpointLabel,
  isConnected,
  isLoading,
}: SystemStatusCardProps) {
  const mutedColor = useThemeColor("muted");
  const successColor = useThemeColor("success");
  const dangerColor = useThemeColor("danger");

  const connectionLabel = isLoading
    ? "Checking the oRPC backend now."
    : isConnected
      ? "The API is reachable and ready."
      : "The API is not responding right now.";

  return (
    <Card variant="secondary" className="p-5">
      <View className="flex-row items-start justify-between gap-4 mb-4">
        <View className="flex-1 gap-1">
          <Card.Title>System status</Card.Title>
          <Card.Description>{connectionLabel}</Card.Description>
        </View>
        <Chip color={isConnected ? "success" : "danger"} size="sm" variant="secondary">
          <Chip.Label>{isLoading ? "Checking" : isConnected ? "Live" : "Offline"}</Chip.Label>
        </Chip>
      </View>

      <View className="rounded-3xl bg-background p-4 gap-4">
        <View className="flex-row items-center gap-3">
          <View className="h-11 w-11 rounded-2xl bg-background items-center justify-center">
            {isLoading ? (
              <Spinner size="sm" color="default" />
            ) : isConnected ? (
              <Ionicons name="checkmark-circle" size={22} color={successColor} />
            ) : (
              <Ionicons name="cloud-offline" size={22} color={dangerColor} />
            )}
          </View>

          <View className="flex-1 gap-1">
            <Text className="text-foreground font-semibold">Backend heartbeat</Text>
            <Text className="text-muted text-sm leading-5">{connectionLabel}</Text>
          </View>
        </View>

        <View className="gap-1">
          <Text className="text-muted text-xs uppercase tracking-widest">Endpoint</Text>
          <Text selectable className="text-foreground text-sm">
            {endpointLabel}
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Ionicons name="pulse" size={16} color={isConnected ? successColor : mutedColor} />
          <Text className="text-muted text-sm">
            Private data stays gated until a session exists.
          </Text>
        </View>
      </View>
    </Card>
  );
}
