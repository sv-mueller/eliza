import { statsigAdapter, type StatsigUser } from "@flags-sdk/statsig";

import { dedupe, flag } from "flags/next";

import { Identify } from "flags";
import { headers } from "next/headers";
import { auth } from "./auth";

export const identify = dedupe(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    return { userID: session.user.id };
  }
  return { userID: "guest" };
}) satisfies Identify<StatsigUser>;

export const createFeatureFlag = (key: string) =>
  flag<boolean, StatsigUser>({
    key,

    adapter: statsigAdapter.featureGate((gate) => gate.value, {
      exposureLogging: true,
    }),

    identify,
  });
