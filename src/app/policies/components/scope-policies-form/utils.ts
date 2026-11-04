// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { AccountType, ScopePolicy } from "@/models/scope-policies";

export function getEntityFromPolicy(policy: ScopePolicy) {
  if (policy.account) {
    return {
      uuid: policy.account.uuid,
      name: policy.account.username ?? "unknown user",
    };
  }
  if (policy.group) {
    return {
      uuid: policy.group.uuid,
      name: policy.group.name ?? "unknown group",
    };
  }
  return null;
}

export function comparePolicies(a: ScopePolicy, b: ScopePolicy): boolean {
  return (
    a.description === b.description &&
    a.rule === b.rule &&
    (a.scopes.length === 0 || a.matchingPolicy === b.matchingPolicy) &&
    (a.account?.uuid ?? null) === (b.account?.uuid ?? null) &&
    (a.group?.uuid ?? null) === (b.group?.uuid ?? null) &&
    a.scopes.length === b.scopes.length &&
    a.scopes.every(scope => b.scopes.includes(scope))
  );
}

export function getDefaultAccountType(policy: ScopePolicy): AccountType {
  if (policy.account === null && policy.group === null) {
    return "ALL";
  }
  if (policy.account !== null && policy.group === null) {
    return "USER";
  }
  if (policy.account === null && policy.group !== null) {
    return "GROUP";
  }
  throw new Error("policy bad formed");
}
