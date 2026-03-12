import { Button } from "@tinywins/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@tinywins/ui/components/card";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

export default function GoogleSignInCard() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleGoogleSignIn() {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    await authClient.signIn.social(
      {
        provider: "google",
        callbackURL: "/dashboard",
      },
      {
        onError: (context) => {
          setIsSubmitting(false);
          toast.error(context.error.message || context.error.statusText || "Google sign-in failed");
        },
        onSuccess: () => {
          setIsSubmitting(false);
        },
      },
    );
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-md items-center px-4 py-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sign in with Google</CardTitle>
          <CardDescription>
            Google is the only sign-in method enabled for this app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={handleGoogleSignIn} disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin" /> : null}
            <span>{isSubmitting ? "Redirecting to Google..." : "Continue with Google"}</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
