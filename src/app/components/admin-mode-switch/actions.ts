"use server";

import { cookies, headers } from "next/headers";
import { settings } from "@/config";
import { redirect } from "next/navigation";

const basePath = settings.basePath ?? "";

export async function toggleAdminMode(enabled: boolean) {
  const cookiesStore = await cookies();
  cookiesStore.set("admin-mode", enabled ? "enabled" : "disabled");
  if (!enabled) {
    const headersList = await headers();
    const refer = headersList.get("referer") as string;
    const url = new URL(refer);
    if (url.pathname !== `${basePath}/users/me`) {
      redirect("/");
    }
  }
}
