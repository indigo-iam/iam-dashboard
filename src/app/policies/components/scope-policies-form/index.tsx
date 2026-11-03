// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useMemo, useState } from "react";
import { redirect } from "next/navigation";

import { addScopePolicy, updateScopePolicy } from "@/services/scope-policies";
import { Field, Label, Description, Form } from "@/components/form";
import { Input, InputList } from "@/components/inputs";
import {
  AccountType,
  PolicyMatcher,
  PolicyRule,
  ScopePolicy,
  ScopePolicyRequest,
} from "@/models/scope-policies";
import { Button } from "@/components/buttons";
import { Info } from "@/components/info";
import ConfirmModal from "@/components/confirm-modal";
import { Notice } from "@/components/notices";
import { toast } from "@/components/toaster";

import DeletePolicyModal from "../table/options/delete-policy-modal";
import { AccountGroupSelector } from "./account-group-selector";
import { SearchTarget } from "./search-target";

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

const ruleOptions: PolicyRule[] = ["PERMIT", "DENY"];
const matchingPolicyOptions: PolicyMatcher[] = ["EQ", "REGEXP", "PATH"];

const scopePlaceholders = {
  EQ: "openid",
  REGEXP: String.raw`^wlcg\.groups:/cms/.*$`,
  PATH: "storage.read:/cms",
};

function getEntityFromPolicy(
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

function getDefaultAccountType(policy: ScopePolicy): AccountType {
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

function comparePolicies(a: ScopePolicy, b: ScopePolicy): boolean {
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

type ScopePoliciesProps = {
  policy?: ScopePolicy;
};

export default function ScopePoliciesForm(props: Readonly<ScopePoliciesProps>) {
  const originalPolicy = props.policy ?? defaultValues;
  const isEditing = props.policy !== undefined;

  const [statePolicy, setStatePolicy] = useState(originalPolicy);
  const defaultAccountType = getDefaultAccountType(originalPolicy);
  const [accountType, setAccountType] =
    useState<AccountType>(defaultAccountType);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const initialEntity = useMemo(
    () => getEntityFromPolicy(originalPolicy),
    [originalPolicy]
  );

  const entityIsNull =
    (accountType === "USER" && statePolicy.account === null) ||
    (accountType === "GROUP" && statePolicy.group === null);

  const policyChanged = !comparePolicies(statePolicy, originalPolicy);
  const scopesMissing =
    (statePolicy.matchingPolicy === "PATH" ||
      statePolicy.matchingPolicy === "REGEXP") &&
    statePolicy.scopes.length === 0;
  const formDisabled = !policyChanged || entityIsNull || scopesMissing;

  async function handleConfirm() {
    const request: ScopePolicyRequest = {
      description: statePolicy.description,
      rule: statePolicy.rule as PolicyRule,
      matchingPolicy: statePolicy.matchingPolicy as PolicyMatcher,
      group: statePolicy.group,
      account: statePolicy.account,
      scopes: statePolicy.scopes.length > 0 ? statePolicy.scopes : null,
    };
    const response = isEditing
      ? await updateScopePolicy(originalPolicy.id, request)
      : await addScopePolicy(request);
    if (response.type === "success") {
      response.description = `Policy "${statePolicy.description}" has been ${isEditing ? "updated" : "created"}`;
    }
    toast.toast(response);
    redirect("/policies");
  }

  function updateDescription(event: React.ChangeEvent<HTMLInputElement>) {
    const description = event.currentTarget.value;
    setStatePolicy({ ...statePolicy, description });
  }

  function updateRule(event: React.ChangeEvent<HTMLSelectElement>) {
    const rule = event.currentTarget.value;
    if (rule !== "PERMIT" && rule !== "DENY") {
      throw new Error(`Policy role ${rule} is not valid`);
    }
    setStatePolicy({ ...statePolicy, rule });
  }

  function updateMatchingPolicy(event: React.ChangeEvent<HTMLSelectElement>) {
    const matchingPolicy = event.currentTarget.value;
    if (
      matchingPolicy !== "EQ" &&
      matchingPolicy !== "REGEXP" &&
      matchingPolicy !== "PATH"
    ) {
      throw new Error(`PolicyMatcher '${matchingPolicy} is not valid`);
    }
    setStatePolicy({ ...statePolicy, matchingPolicy });
  }

  function updateAccountType(value: AccountType) {
    setAccountType(value);
    setStatePolicy({ ...statePolicy, account: null, group: null });
  }

  function updateEntity(entity: { uuid: string; name: string } | null) {
    if (accountType === "USER") {
      setStatePolicy({
        ...statePolicy,
        account: entity ? { uuid: entity.uuid, username: entity.name } : null,
      });
    }
    if (accountType === "GROUP") {
      setStatePolicy({
        ...statePolicy,
        group: entity,
      });
    }
  }

  function handleScopesChange(items: string[]) {
    setStatePolicy({ ...statePolicy, scopes: items });
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
          onChange={updateDescription}
          autoComplete="off"
          required
        />
        <Description>Something users will recognize and trust</Description>
      </Field>
      <div className="flex gap-5">
        <Field>
          <Label>Rule</Label>
          <select
            name="rule"
            defaultValue={statePolicy.rule}
            onChange={updateRule}
          >
            {ruleOptions.map(rule => (
              <option key={rule} value={rule}>
                {rule}
              </option>
            ))}
          </select>
          <Description>Permit or deny this policy</Description>
        </Field>
        <Field>
          <div className="flex items-center gap-1">
            <Label>Matching Policy</Label>
            <div>
              <Info>
                EQ: exact string match
                <br />
                REGEXP: match via regular expression
                <br />
                PATH: WLCG-specific path-based matching
              </Info>
            </div>
          </div>
          <select
            name="matchingPolicy"
            defaultValue={statePolicy.matchingPolicy}
            onChange={updateMatchingPolicy}
          >
            {matchingPolicyOptions.map(mp => (
              <option key={mp} value={mp}>
                {mp}
              </option>
            ))}
          </select>
          <Description>Select the right matching policy</Description>
        </Field>
      </div>
      <Field>
        <Label>Target</Label>
        <AccountGroupSelector
          defaultValue={defaultAccountType}
          onChange={updateAccountType}
        />
        <SearchTarget
          key={accountType}
          accountType={accountType}
          initialEntity={initialEntity}
          onChange={updateEntity}
        />
        <Description>Select which entity to apply the policy to</Description>
      </Field>
      <Field>
        <Label
          data-required={
            statePolicy.matchingPolicy === "PATH" ||
            statePolicy.matchingPolicy === "REGEXP" ||
            undefined
          }
        >
          Scopes
        </Label>
        <InputList
          originalItems={originalPolicy.scopes}
          name="scopes"
          type="text"
          placeholder={scopePlaceholders[statePolicy.matchingPolicy]}
          onChange={handleScopesChange}
        />
        <Description>
          Scopes this policy applies to. Required for PATH and REGEXP
        </Description>
      </Field>
      <div className="flex justify-between">
        {isEditing && (
          <div className="flex justify-end">
            <Button
              className="btn-danger"
              type="button"
              onClick={() => setShowDelete(true)}
            >
              Delete
            </Button>
            <DeletePolicyModal
              show={showDelete}
              onClose={() => setShowDelete(false)}
              policy={originalPolicy}
              onDeleted={() => redirect("/policies")}
            />
          </div>
        )}
        <div className="ml-auto flex justify-end gap-2">
          <Button className="btn-tertiary" type="button" onClick={reset}>
            Reset
          </Button>
          <Button
            className="btn-primary"
            onClick={() => setShowConfirm(true)}
            disabled={formDisabled}
          >
            {isEditing ? "Save changes" : "Add Scope Policy"}
          </Button>
          <ConfirmModal
            show={showConfirm}
            onClose={() => setShowConfirm(false)}
            onConfirm={handleConfirm}
            title={isEditing ? "Edit Scope Policy" : "Create Scope Policy"}
            confirmButtonDisabled={formDisabled}
          >
            <div className="space-y-4">
              <p>
                {`Are you sure you want to ${isEditing ? "update" : "add"} this scope policy?`}
              </p>
              <Notice>
                <p>
                  <b>Description: </b>
                  {statePolicy.description}
                </p>
                <p>
                  <b>Rule: </b>
                  {statePolicy.rule}
                </p>
                <p>
                  <b>Matching Policy: </b>
                  {statePolicy.matchingPolicy}
                </p>
                <p>
                  <b>Target: </b>
                  {accountType === "ALL"
                    ? "accounts and groups"
                    : (getEntityFromPolicy(statePolicy)?.name ?? "-")}
                </p>
                <p>
                  <b>Scopes: </b>
                  {statePolicy.scopes.length === 0
                    ? "all"
                    : statePolicy.scopes.join(" ")}
                </p>
              </Notice>
            </div>
          </ConfirmModal>
        </div>
      </div>
    </Form>
  );
}
