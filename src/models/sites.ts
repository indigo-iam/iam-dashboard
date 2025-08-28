// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

export type Site = {
  id: number;
  userId: string;
  clientId: string;
  creationDate: Date;
  accessDate: Date;
  timeoutDate: Date;
  allowedScopes: string[];
};

export type ActiveToken = {
  id: number;
  value?: string;
  refreshTokenId?: string;
  scopes: string[];
  clientId: string;
  userId: string;
  expiration: Date;
};
