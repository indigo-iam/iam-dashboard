"use server";
import { signIn, signOut } from "@/auth";
import getConfig from "@/utils/config";
import { redirect } from "next/navigation";
const { BASE_URL } = getConfig();

export async function login() {
  await signIn("indigo-iam", { redirectTo: "/" });
}

export async function logout() {
  await signOut({ redirect: false });
  redirect(`${BASE_URL}/logout`);
}
