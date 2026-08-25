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

  const [description, setDescription] = useState(policy.description);
  const [rule, setRule] = useState(policy.rule);
  const [matchingPolicy, setMatchingPolicy] = useState(policy.matchingPolicy);
  const [accountGroupSelection, setAccountGroupSelection] = useState<AccountGroupSelection>({
    user: props.policy?.account ?? null,
    group: props.policy?.group ?? null,
  });

  const selectedRule = { id: rule, name: rule };
  const matchingPolicySelector = { id: matchingPolicy, name: matchingPolicy };

  return (
    <div className="panel space-y-4">
      <Field>
        <Label>Description</Label>
        <Description>Something users will recognize and trust</Description>
        <Input
          type="text"
          name="description"
          title="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder={policy?.description ?? "Default Permit ALL policy"}
          required
        />
      </Field>

      <div className="flex gap-5">
        <Field>
          <Label>Rule</Label>
          <Description>Select permit or deny</Description>
          <Select name="rule" defaultValue={selectedRule} onChange={value => setRule(value.name)}>
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
          <Select name="matchingPolicy" defaultValue={matchingPolicySelector} onChange={value => setMatchingPolicy(value.name)}>
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
