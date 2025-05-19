// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { settings } from "@/config";
import { OpenIdConfiguration } from "@/models/openid-configuration";

const { BASE_URL } = settings;

export const fetchOpenIdConfiguration: () => Promise<OpenIdConfiguration> =
  async () => {
    const response = await fetch(
      `${BASE_URL}/.well-known/openid-configuration`
    );
    return response.json();
  };
