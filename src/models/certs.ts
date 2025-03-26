// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

export type CertLinkRequest = {
  notes?: string;
  label: string;
  pemEncodedCertificate: string;
};
