// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

export interface Registration {
  username: string;
  givenname: string;
  familyname: string;
  email: string;
  uuid: string;
  accountId: string;
  creationTime: number;
  status: string;
  notes?: string;
}
