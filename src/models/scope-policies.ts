// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

export type AccountSelector = {
  uuid: string;
  username?: string;
  location?: string;
};

export type GroupSelector = {
  uuid: string;
  name?: string;
  location?: string;
};

export type PolicyRule = "PERMIT" | "DENY";
export type PolicyMatcher = "EQ" | "REGEXP" | "PATH";

export type ScopePolicy = {
  id: number;
  description: string;
  creationTime?: Date;
  lastUpdateTime?: Date;
  rule: PolicyRule;
  matchingPolicy: PolicyMatcher;
  group: GroupSelector | null;
  account: AccountSelector | null;
  scopes: string[];
}

export type ScopePolicyRequest = {
  description?: string;
  rule: PolicyRule;
  matchingPolicy: PolicyMatcher;
  group: GroupSelector | null;
  account: AccountSelector | null;
  scopes: string[];
}
