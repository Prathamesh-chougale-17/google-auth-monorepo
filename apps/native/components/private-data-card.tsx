import { Spinner, Surface } from "heroui-native";
import { Text, View } from "react-native";

type PrivateDataCardProps = {
  isLoading: boolean;
  message?: string;
};

export function PrivateDataCard({ isLoading, message }: PrivateDataCardProps) {
  return (
    <Surface variant="secondary" className="rounded-3xl p-5">
      <View className="gap-3">
        <View className="gap-1">
          <Text className="text-foreground text-base font-semibold">Private workspace data</Text>
          <Text className="text-muted text-sm leading-5">
            This card stays simple now, but it is ready to grow into a real personalized dashboard.
          </Text>
        </View>

        <View className="rounded-3xl bg-background p-4 min-h-24 justify-center">
          {isLoading ? (
            <View className="flex-row items-center gap-3">
              <Spinner size="sm" color="default" />
              <Text className="text-muted text-sm">Loading private data...</Text>
            </View>
          ) : (
            <Text selectable className="text-foreground text-sm leading-6">
              {message || "Private data is unavailable right now."}
            </Text>
          )}
        </View>
      </View>
    </Surface>
  );
}
