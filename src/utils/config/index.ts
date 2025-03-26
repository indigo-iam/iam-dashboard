// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

export default function getConfig() {
  return {
    BASE_URL: process.env.IAM_AUTHORITY_URL,
  };
}
