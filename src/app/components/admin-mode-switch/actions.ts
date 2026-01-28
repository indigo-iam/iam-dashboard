"use server";

import { cookies, headers } from "next/headers";
import { settings } from "@/config";
import { redirect } from "next/navigation";

const { IAM_DASHBOARD_BASE_PATH } = settings;

export async function toggleAdminMode(enabled: boolean) {
  const cookiesStore = await cookies();
  cookiesStore.set("admin-mode", enabled ? "enabled" : "disabled");
  if (!enabled) {
    const headersList = await headers();
    const refer = headersList.get("referer") as string;
    const url = new URL(refer);
    if (
      url.pathname === `${IAM_DASHBOARD_BASE_PATH}/users/me` ||
      url.pathname.startsWith(`${IAM_DASHBOARD_BASE_PATH}/clients`)
    ) {
      return;
    }
    redirect("/");
  }
}
