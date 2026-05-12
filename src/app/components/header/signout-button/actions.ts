// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { signOut } from "@/auth";
import { redirect } from "next/navigation";

export async function logout() {
  await signOut();
  redirect("/");
}
