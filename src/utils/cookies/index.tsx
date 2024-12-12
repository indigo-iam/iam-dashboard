"use server";
import { cookies } from "next/headers";

export async function clearCookie() {
  const cookiesStore = await cookies();
  cookiesStore.delete("notification");
}
