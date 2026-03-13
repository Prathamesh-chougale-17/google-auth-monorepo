import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Button, Card, Spinner, useThemeColor, useToast } from "heroui-native";
import { useState } from "react";
import { Text, View } from "react-native";

import { authClient } from "@/lib/auth-client";
import { queryClient } from "@/utils/orpc";

export function GoogleSignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const accentForegroundColor = useThemeColor("accent-foreground");

  async function handleGoogleSignIn() {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    let errorMessage: string | null = null;

    await authClient.signIn.social(
      {
        provider: "google",
        callbackURL: "/",
      },
      {
        onError: (context) => {
          errorMessage =
            context.error.message || context.error.statusText || "Failed to sign in with Google";
        },
      },
    );

    const session = await authClient.getSession();

    setIsSubmitting(false);

    if (session.data?.user) {
      queryClient.invalidateQueries();
      router.replace("/");
      toast.show({
        variant: "success",
        label: "Signed in with Google",
      });
      return;
    }

    toast.show({
      variant: errorMessage ? "danger" : "default",
      label: errorMessage || "Google sign-in was cancelled",
    });
  }

  return (
    <Card variant="secondary" className="p-5">
      <View className="flex-row items-start gap-3 mb-5">
        <View className="h-11 w-11 rounded-2xl bg-accent items-center justify-center">
          <Ionicons name="logo-google" size={20} color={accentForegroundColor} />
        </View>

        <View className="flex-1 gap-1">
          <Text className="text-foreground text-base font-semibold">Continue with Google</Text>
          <Text className="text-muted text-sm leading-5">
            Sign in to unlock private data, session-aware API requests, and future account features.
          </Text>
        </View>
      </View>

      <Button onPress={handleGoogleSignIn} isDisabled={isSubmitting}>
        {isSubmitting ? (
          <Spinner size="sm" color="default" />
        ) : (
          <Button.Label>Continue with Google</Button.Label>
        )}
      </Button>
    </Card>
  );
}
