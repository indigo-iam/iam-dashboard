// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { settings } from "@/config";
import { getItem } from "@/utils/fetch";
import { User } from "@/models/scim";

const { IAM_API_URL } = settings;

export async function fetchMe() {
  return getItem<User>(`${IAM_API_URL}/scim/Me`);
}
