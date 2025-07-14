"use server";

import { cookies } from "next/headers";

export async function toggleAdminMode(enabled: boolean) {
  const cookiesStore = await cookies();
  cookiesStore.set("admin-mode", enabled ? "enabled" : "disabled");
}
