// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { cookies } from "next/headers";
import { Notification } from "@/components/toaster";

export async function setNotification(notification: Notification) {
  const cookiesStore = await cookies();
  cookiesStore.set("notification", JSON.stringify(notification), {
    path: "/",
    expires: new Date(Date.now() + 1 * 1000),
  });
}

export async function getNotification(): Promise<Notification | undefined> {
  const cookiesStore = await cookies();
  const cookie = cookiesStore.get("notification");
  if (cookie) {
    return JSON.parse(cookie.value);
  }
}
