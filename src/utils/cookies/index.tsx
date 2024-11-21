"use server";
import { cookies } from "next/headers";

export async function clearCookie() {
  cookies().delete("notification");
}
