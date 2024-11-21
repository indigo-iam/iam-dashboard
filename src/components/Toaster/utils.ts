import { cookies } from "next/headers";
import { Notification } from "./types";

export function setNotification(notification: Notification) {
  cookies().set("notification", JSON.stringify(notification), {
    path: "/",
    expires: new Date(Date.now() + 1 * 1000),
  });
}

export async function getNotification(): Promise<Notification | undefined> {
  const cookie = cookies().get("notification");
  if (cookie) {
    return JSON.parse(cookie.value);
  }
}
