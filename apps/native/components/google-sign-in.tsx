import { router } from "expo-router";
import { Button, Spinner, Surface, useToast } from "heroui-native";
import { useState } from "react";
import { Text, View } from "react-native";

import { authClient } from "@/lib/auth-client";
import { queryClient } from "@/utils/orpc";

export function GoogleSignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
    <Surface variant="secondary" className="p-4 rounded-lg">
      <View className="gap-2 mb-4">
        <Text className="text-foreground font-medium">Sign in with Google</Text>
        <Text className="text-muted text-sm">
          Google is the only sign-in method enabled for this app.
        </Text>
      </View>

      <Button onPress={handleGoogleSignIn} isDisabled={isSubmitting}>
        {isSubmitting ? (
          <Spinner size="sm" color="default" />
        ) : (
          <Button.Label>Continue with Google</Button.Label>
        )}
      </Button>
    </Surface>
  );
}
