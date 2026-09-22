// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import { AccountGroupSelector } from "./account-group-selector";
import ConfirmButton from "./confirm-button";
import { addScopePolicy, updateScopePolicy } from "@/services/scope-policies";
import {
  Field,
  Label,
  Description,
  Select,
  SelectOption,
  Form,
} from "@/components/form";
import { Input } from "@/components/inputs";
import {
  PolicyMatcher,
  PolicyRule,
  ScopePolicy,
  ScopePolicyRequest,
} from "@/models/scope-policies";
import { Button } from "@/components/buttons";
import { SearchTarget } from "./search-target";

type ScopePoliciesProps = {
  policy?: ScopePolicy;
};

type EntityType = "null" | "user" | "group";

const defaultValues: ScopePolicy = {
  id: -1,
  description: "Default Deny ALL policy",
  creationTime: undefined,
  lastUpdateTime: undefined,
  rule: "DENY",
  matchingPolicy: "EQ",
  account: null,
  group: null,
  scopes: [],
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

function getInitialEntity(
  policy: ScopePolicy
): { uuid: string; name: string } | null {
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

function getDefaultEntityType(policy: ScopePolicy): EntityType {
  if (policy.account === null && policy.group === null) {
    return "null";
  }
  if (policy.account !== null && policy.group === null) {
    return "user";
  }
  if (policy.account === null && policy.group !== null) {
    return "group";
  }
  throw new Error("policy bad formed");
}

export default function ScopePoliciesForm(props: Readonly<ScopePoliciesProps>) {
  const originalPolicy = props.policy ?? defaultValues;
  const isEditing = props.policy !== undefined;

  const [statePolicy, setStatePolicy] = useState(originalPolicy);
  const [entityType, setEntityType] = useState<EntityType>(
    getDefaultEntityType(originalPolicy)
  );

  const selectedRule = { id: statePolicy.rule, name: statePolicy.rule };
  const selectedMatchingPolicy = {
    id: statePolicy.matchingPolicy,
    name: statePolicy.matchingPolicy.toUpperCase(),
  };

  const entitySelectedButNull =
    (entityType === "user" && statePolicy.account === null) ||
    (entityType === "group" && statePolicy.group === null);

  const policyChanged =
    statePolicy.description !== originalPolicy.description ||
    statePolicy.rule !== originalPolicy.rule ||
    statePolicy.matchingPolicy !== originalPolicy.matchingPolicy ||
    (statePolicy.account?.uuid ?? null) !==
      (originalPolicy.account?.uuid ?? null) ||
    (statePolicy.group?.uuid ?? null) !== (originalPolicy.group?.uuid ?? null);

  async function handleConfirm() {
    const request: ScopePolicyRequest = {
      description: statePolicy.description,
      rule: statePolicy.rule as PolicyRule,
      matchingPolicy: statePolicy.matchingPolicy as PolicyMatcher,
      group: statePolicy.group ?? null,
      account: statePolicy.account ?? null,
      scopes: originalPolicy.scopes ?? [],
    };
    if (isEditing) {
      await updateScopePolicy(originalPolicy.id, request);
    } else {
      await addScopePolicy(request);
    }
  }

  function handleEntityChange(entity: { uuid: string; name: string } | null) {
    if (entityType === "user") {
      setStatePolicy({
        ...statePolicy,
        account: entity ? { uuid: entity.uuid, username: entity.name } : null,
      });
    }
    if (entityType === "group") {
      setStatePolicy({
        ...statePolicy,
        group: entity,
      });
    }
  }

  function updateStatePolicy(name: string, value: string) {
    setStatePolicy({ ...statePolicy, [name]: value });
  }

  function handleEntityTypeChange(newEntityType: EntityType) {
    setEntityType(newEntityType);
    setStatePolicy({ ...statePolicy, account: null, group: null });
  }

  // resets only the description until the Select component accepts `value={}`
  function reset() {
    setStatePolicy({ ...statePolicy, description: originalPolicy.description });
  }

  return (
    <Form className="panel space-y-4 border-none">
      <Field>
        <Label data-required>Policy name</Label>
        <Input
          type="text"
          name="description"
          title="Description"
          value={statePolicy.description}
          onChange={event =>
            updateStatePolicy(event.target.name, event.target.value)
          }
          required
        />
        <Description>Something users will recognize and trust</Description>
      </Field>

      <div className="flex gap-5">
        <Field>
          <Label>Rule</Label>
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
          <Description>Permit or deny this policy</Description>
        </Field>

        <Field>
          <Label>Matching Policy</Label>
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
          <Description>Select the right matching policy</Description>
        </Field>
      </div>

      <Field>
        <Label>Target</Label>
        <AccountGroupSelector
          entityType={entityType}
          onChange={handleEntityTypeChange}
        />
        <SearchTarget
          key={entityType}
          entityType={entityType}
          initialEntity={getInitialEntity(originalPolicy)}
          onChange={handleEntityChange}
        />
        <Description>
          Select account, group or both to which this policy applies
        </Description>
      </Field>

      <div className="flex justify-end gap-2">
        <Button className="btn-tertiary" type="button" onClick={reset}>
          Reset
        </Button>

        <ConfirmButton
          label={isEditing ? "Save changes" : "Add Scope Policy"}
          title={isEditing ? "Edit Scope Policy" : "Create Scope Policy"}
          onConfirm={handleConfirm}
          confirmButtonDisabled={!policyChanged || entitySelectedButNull}
        >
          <p>
            {`Are you sure you want to ${isEditing ? "update" : "add"} this scope policy?`}
          </p>
        </ConfirmButton>
      </div>
    </Form>
  );
}
