// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";
import { cookies } from "next/headers";

export async function clearCookie() {
  const cookiesStore = await cookies();
  cookiesStore.delete("notification");
}
