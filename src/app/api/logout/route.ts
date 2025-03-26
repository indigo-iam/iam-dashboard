// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { signOut } from "@/auth";
import { unstable_noStore as noStore } from "next/cache";
import getConfig from "@/utils/config";

const { BASE_URL } = getConfig();

export const GET = async () => {
  noStore();
  const url = `${BASE_URL}/logout`;
  await fetch(url, {
    credentials: "include",
  });
  await signOut();
};
