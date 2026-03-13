import { useQuery } from "@tanstack/react-query";
import { env } from "@tinywins/env/native";
import { View } from "react-native";

import { AccountSummaryCard } from "@/components/account-summary-card";
import { Container } from "@/components/container";
import { GoogleSignIn } from "@/components/google-sign-in";
import { HomeHero } from "@/components/home-hero";
import { PrivateDataCard } from "@/components/private-data-card";
import { SystemStatusCard } from "@/components/system-status-card";
import { WorkspaceHighlightsCard } from "@/components/workspace-highlights-card";
import { authClient } from "@/lib/auth-client";
import { queryClient, orpc } from "@/utils/orpc";

function formatEndpointLabel(url: string) {
  return url.replace(/^https?:\/\//, "");
}

export function HomeScreen() {
  const { data: session } = authClient.useSession();

  const healthCheck = useQuery(orpc.healthCheck.queryOptions());
  const privateData = useQuery({
    ...orpc.privateData.queryOptions(),
    enabled: Boolean(session?.user),
  });

  const isConnected = healthCheck.data === "OK";
  const endpointLabel = formatEndpointLabel(env.EXPO_PUBLIC_SERVER_URL);

  async function handleSignOut() {
    await authClient.signOut();
    await queryClient.invalidateQueries();
  }

  return (
    <Container>
      <View className="gap-5 px-6 pb-10 pt-4">
        <HomeHero
          isConnected={isConnected}
          isLoading={healthCheck.isLoading}
          sessionName={session?.user?.name}
        />

        <SystemStatusCard
          endpointLabel={endpointLabel}
          isConnected={isConnected}
          isLoading={healthCheck.isLoading}
        />

        <WorkspaceHighlightsCard />

        {session?.user ? (
          <>
            <AccountSummaryCard
              email={session.user.email}
              name={session.user.name}
              onSignOut={handleSignOut}
            />
            <PrivateDataCard
              isLoading={privateData.isLoading}
              message={privateData.data?.message}
            />
          </>
        ) : (
          <GoogleSignIn />
        )}
      </View>
    </Container>
  );
}
