// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export async function login() {
  const url = await signIn();
  if (!url) {
    throw new Error("Failed to complete authorization flow");
  }
  redirect(url);
}
