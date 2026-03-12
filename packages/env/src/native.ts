import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const runtimeEnv = (
  globalThis as typeof globalThis & {
    process?: { env: Record<string, string | undefined> };
  }
).process?.env ?? {};

export const env = createEnv({
  clientPrefix: "EXPO_PUBLIC_",
  client: {
    EXPO_PUBLIC_SERVER_URL: z.url(),
  },
  runtimeEnv,
  emptyStringAsUndefined: true,
});
