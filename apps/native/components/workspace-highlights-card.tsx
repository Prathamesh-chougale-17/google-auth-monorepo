import { Ionicons } from "@expo/vector-icons";
import { Card, useThemeColor } from "heroui-native";
import { Text, View } from "react-native";

const highlightItems = [
  {
    description: "Google-only auth keeps the entry point simple and predictable.",
    icon: "logo-google",
    title: "Cleaner sign-in",
  },
  {
    description: "The starter scaffold has been collapsed into one focused home.",
    icon: "layers-outline",
    title: "Less navigation noise",
  },
  {
    description: "The home screen is split into reusable cards for future product work.",
    icon: "construct-outline",
    title: "Explicit components",
  },
] as const;

export function WorkspaceHighlightsCard() {
  const accentForegroundColor = useThemeColor("accent-foreground");

  return (
    <Card variant="secondary" className="p-5">
      <View className="gap-1 mb-4">
        <Card.Title>Why this structure works better</Card.Title>
        <Card.Description>
          The native app is now organized around reusable sections instead of starter navigation.
        </Card.Description>
      </View>

      <View className="gap-3">
        {highlightItems.map((item) => (
          <View key={item.title} className="flex-row items-start gap-3 rounded-3xl bg-background p-4">
            <View className="h-10 w-10 rounded-2xl bg-accent items-center justify-center">
              <Ionicons name={item.icon} size={18} color={accentForegroundColor} />
            </View>

            <View className="flex-1 gap-1">
              <Text className="text-foreground font-semibold">{item.title}</Text>
              <Text className="text-muted text-sm leading-5">{item.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </Card>
  );
}
