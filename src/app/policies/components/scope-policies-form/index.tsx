// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import {
  AccountGroupSelector,
  AccountGroupSelection,
} from "./account-group-selector";
import ConfirmButton from "./confirm-button";
import { addScopePolicy, updateScopePolicy } from "@/services/scope-policies";
import {
  Field,
  Label,
  Description,
  Select,
  SelectOption,
} from "@/components/form";
import { Input } from "@/components/inputs";
import {
  PolicyMatcher,
  PolicyRule,
  ScopePolicy,
  ScopePolicyRequest,
} from "@/models/scope-policies";

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
  const originalPolicy = { ...policy };
  const isEditing = props.policy != undefined;

  const [statePolicy, setStatePolicy] = useState(policy);
  const [accountGroupSelection, setAccountGroupSelection] =
    useState<AccountGroupSelection>({
      user: props.policy?.account ?? null,
      group: props.policy?.group ?? null,
    });

  const selectedRule = { id: statePolicy.rule, name: statePolicy.rule };
  const selectedMatchingPolicy = {
    id: statePolicy.matchingPolicy,
    name: statePolicy.matchingPolicy,
  };

  async function handleConfirm() {
    const request: ScopePolicyRequest = {
      description: statePolicy.description,
      rule: statePolicy.rule as PolicyRule,
      matchingPolicy: statePolicy.matchingPolicy as PolicyMatcher,
      group: accountGroupSelection.group,
      account: accountGroupSelection.user,
      scopes: props.policy?.scopes ?? [],
    };
    if (props.policy) {
      await updateScopePolicy(props.policy.id, request);
    } else {
      await addScopePolicy(request);
    }
  }

  function updateStatePolicy(name: string, value: string) {
    setStatePolicy(prev => ({ ...prev, [name]: value }));
  }

  const policyChanged =
    statePolicy.description === originalPolicy.description &&
    statePolicy.rule === originalPolicy.rule &&
    statePolicy.matchingPolicy === originalPolicy.matchingPolicy &&
    accountGroupSelection.user?.uuid ===
      (originalPolicy.account?.uuid ?? null) &&
    accountGroupSelection.group?.uuid === (originalPolicy.group?.uuid ?? null);

  return (
    <div className="panel space-y-4">
      <Field>
        <Label>Description</Label>
        <Description>Something users will recognize and trust</Description>
        <Input
          type="text"
          name="description"
          title="Description"
          value={statePolicy.description}
          onChange={event =>
            updateStatePolicy(event.target.name, event.target.value)
          }
          placeholder={statePolicy.description}
          required
        />
      </Field>

      <div className="flex gap-5">
        <Field>
          <Label>Rule</Label>
          <Description>Select permit or deny</Description>
          <Select
            name="rule"
            defaultValue={selectedRule}
            onChange={value => updateStatePolicy("rule", value.name)}
          >
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
          <Select
            name="matchingPolicy"
            defaultValue={selectedMatchingPolicy}
            onChange={value => updateStatePolicy("matchingPolicy", value.name)}
          >
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
        <AccountGroupSelector
          policy={props.policy}
          onChange={setAccountGroupSelection}
        />
      </Field>

      <ConfirmButton
        label={isEditing ? "Save changes" : "Add Scope Policy"}
        title={isEditing ? "Edit Scope Policy" : "Create Scope Policy"}
        onConfirm={handleConfirm}
        confirmButtonDisabled={!policyChanged}
      >
        <p>
          {isEditing
            ? "Are you sure you want to update this scope policy?"
            : "Are you sure you want to add this new scope policy?"}
        </p>
      </ConfirmButton>
    </div>
  );
}
