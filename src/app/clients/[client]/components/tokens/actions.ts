// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { Client } from "@/models/client";
import { editClient } from "@/services/clients";

export async function updateClient(client: Client, formData: FormData) {
  const access_token_validity_seconds = formData.has(
    "access_token_validity_seconds"
  )
    ? parseInt(formData.get("access_token_validity_seconds") as string)
    : undefined;

  const id_token_validity_seconds = formData.has("id_token_validity_seconds")
    ? parseInt(formData.get("id_token_validity_seconds") as string)
    : undefined;

  const require_auth_time = !!formData.get("require_auth_time");

  const refresh_token_validity_seconds = formData.has(
    "refresh_token_validity_seconds"
  )
    ? parseInt(formData.get("refresh_token_validity_seconds") as string)
    : undefined;

  const reuse_refresh_token = !!formData.get("reuse_refresh_token");
  const clear_access_tokens_on_refresh = !!formData.get(
    "clear_access_tokens_on_refresh"
  );

  const device_code_validity_seconds = formData.has(
    "device_code_validity_seconds"
  )
    ? parseInt(formData.get("device_code_validity_seconds") as string)
    : undefined;

  const requestBody: Client = {
    ...client,
    access_token_validity_seconds,
    id_token_validity_seconds,
    require_auth_time,
    refresh_token_validity_seconds,
    reuse_refresh_token,
    clear_access_tokens_on_refresh,
    device_code_validity_seconds,
  };
  await editClient(requestBody);
}
