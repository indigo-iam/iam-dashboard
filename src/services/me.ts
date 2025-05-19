// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { settings } from "@/config";
import { getItem } from "@/utils/fetch";
import { User } from "@/models/scim";
import { Paginated } from "@/models/pagination";
import { Client } from "@/models/client";

const { BASE_URL } = settings;

export async function fetchMe() {
  return getItem<User>(`${BASE_URL}/scim/Me`);
}

export async function getClientsPage(count: number, startIndex: number = 1) {
  return await getItem<Paginated<Client>>(
    `${BASE_URL}/iam/account/me/clients?count=${count}&startIndex=${startIndex}`
  );
}
