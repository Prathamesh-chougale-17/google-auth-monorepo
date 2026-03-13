import { Button, Card, Chip, useThemeColor } from "heroui-native";
import { Text, View } from "react-native";

type AccountSummaryCardProps = {
  email?: string | null;
  name?: string | null;
  onSignOut: () => Promise<void> | void;
};

function getInitial(name?: string | null) {
  return (name?.trim().charAt(0) || "T").toUpperCase();
}

export function AccountSummaryCard({ email, name, onSignOut }: AccountSummaryCardProps) {
  const accentForegroundColor = useThemeColor("accent-foreground");

  return (
    <Card variant="secondary" className="p-5">
      <View className="flex-row items-start justify-between gap-4 mb-4">
        <View className="flex-row items-center gap-3 flex-1">
          <View className="h-12 w-12 rounded-2xl bg-accent items-center justify-center">
            <Text className="text-lg font-semibold" style={{ color: accentForegroundColor }}>
              {getInitial(name)}
            </Text>
          </View>

          <View className="flex-1 gap-1">
            <Text className="text-foreground text-base font-semibold">
              {name || "Signed in user"}
            </Text>
            <Text selectable className="text-muted text-sm">
              {email || "No email available"}
            </Text>
          </View>
        </View>

        <Chip color="success" size="sm" variant="secondary">
          <Chip.Label>Google</Chip.Label>
        </Chip>
      </View>

      <View className="rounded-3xl bg-background p-4 gap-4">
        <View className="gap-1">
          <Text className="text-muted text-xs uppercase tracking-widest">Session</Text>
          <Text className="text-foreground text-sm leading-5">
            Your native session is active and ready for protected API access.
          </Text>
        </View>

        <Button onPress={onSignOut} size="sm">
          <Button.Label>Sign out</Button.Label>
        </Button>
      </View>
    </Card>
  );
}
