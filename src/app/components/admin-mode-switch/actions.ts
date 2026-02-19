// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { signIn, signOut } from "@/auth";

export async function signInWithRole(role: "admin" | "default") {
  await signOut();
  return await signIn(role);
}
