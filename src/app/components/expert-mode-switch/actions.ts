"use server";

import { cookies } from "next/headers";

export async function toggleExpertMode(enabled: boolean) {
  const cookiesStore = await cookies();
  cookiesStore.set("expert-mode", enabled ? "enabled" : "disabled");
}
