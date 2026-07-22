// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";
import { Field, Label, Description, Select, SelectOption } from "@/components/form";
import { Input } from "@/components/inputs";
import { ScopePolicy } from "@/models/scope-policies";
import { AccountGroupSelector, AccountGroupSelection } from "./account-group-selector";

type ScopePoliciesProps = {
  policy?: ScopePolicy;
};

const defaultValues = {
  description: "Default Permit ALL policy",
  rule: "DENY",
  matchingPolicy: "EQ",
  account: null,
  group: null,
};

const ruleOptions = [
  { id: "permit", name: "PERMIT" },
  { id: "deny", name: "DENY" },
];

const matchingPolicyOptions = [
  { id: "eq", name: "EQ" },
  { id: "regexp", name: "REGEXP" },
  { id: "path", name: "PATH" },
];

export default function ScopePoliciesForm(props: Readonly<ScopePoliciesProps>) {
  const policy = props.policy ?? defaultValues;
  const rule = { id: policy.rule, name: policy.rule };
  const matchingPolicySelector = {
    id: policy.matchingPolicy,
    name: policy.matchingPolicy,
  };

  const [accountGroupSelection, setAccountGroupSelection] = useState<AccountGroupSelection>({ users: [], groups: [] });

  return (
    <div className="panel space-y-4">
      <Field>
        <Label>Description</Label>
        <Description>Something users will recognize and trust</Description>
        <Input
          type="text"
          name="description"
          title="Description"
          placeholder={policy?.description ?? "Default Permit ALL policy"}
          required
        />
      </Field>

      <div className="flex gap-5">
        <Field>
          <Label>Rule</Label>
          <Description>Select permit or deny</Description>
          <Select name="rule" defaultValue={rule}>
            {ruleOptions.map(rule => (
              <SelectOption key={rule.id} value={rule}>
                {rule.name}
              </SelectOption>
            ))}
          </Select>
        </Field>

        <Field>
          <Label>Matching Policy</Label>
          <Description>Select the right matching policy</Description>
          <Select name="rule" defaultValue={matchingPolicySelector}>
            {matchingPolicyOptions.map(mp => (
              <SelectOption key={mp.id} value={mp}>
                {mp.name}
              </SelectOption>
            ))}
          </Select>
        </Field>
      </div>

      <Field>
        <Label>Account/Group</Label>
        <Description>Select account or group</Description>
        <AccountGroupSelector policy={props.policy} onChange={setAccountGroupSelection} />
      </Field>
    </div>
  );
}
