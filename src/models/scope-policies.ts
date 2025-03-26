// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

export type AccountSelector = {};

export type GroupSelector = {
  uuid: string;
  name?: string;
  location?: string;
};

export interface ScopePolicy {
  id: number;
  description: string;
  creationTime: Date;
  lastUpdateTime: Date;
  rule: "PERMIT" | "DENY";
  matchingPolicy: "EQ" | "REGEXP" | "PATH";
  group?: GroupSelector;
  account?: AccountSelector;
  scopes: [string];
}
