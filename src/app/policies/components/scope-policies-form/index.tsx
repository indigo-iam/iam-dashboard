// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useMemo, useState } from "react";
import { redirect } from "next/navigation";

import { Form } from "@/components/form";
import { Field } from "@/components/field";
import { Description } from "@/components/description";
import { Label } from "@/components/label";
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
import { Option, Select } from "@/components/select";
import { useToaster } from "@/components/toaster";
import { addScopePolicy, updateScopePolicy } from "@/services/scope-policies";

import { AccountGroupSelector } from "./account-group-selector";
import { SearchTarget } from "./search-target";
import {
  getEntityFromPolicy,
  comparePolicies,
  getDefaultAccountType,
} from "./utils";
import { DeletePolicyButton } from "./delete-button";
import { SaveButton } from "./save-button";

const defaultValues: ScopePolicy = {
  id: -1,
  description: "",
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

type ScopePoliciesProps = {
  policy?: ScopePolicy;
  readWrite?: boolean;
};

export default function ScopePoliciesForm(props: Readonly<ScopePoliciesProps>) {
  const { readWrite } = props;
  const originalPolicy = props.policy ?? defaultValues;
  const isEditing = props.policy !== undefined;
  const [statePolicy, setStatePolicy] = useState(originalPolicy);
  const defaultAccountType = getDefaultAccountType(originalPolicy);
  const [accountType, setAccountType] =
    useState<AccountType>(defaultAccountType);
  const { toast } = useToaster();

  const initialEntity = useMemo(
    () => getEntityFromPolicy(originalPolicy),
    [originalPolicy]
  );

  const entityIsNull =
    (accountType === "USER" && !statePolicy.account) ||
    (accountType === "GROUP" && !statePolicy.group);

  const policyChanged = !comparePolicies(statePolicy, originalPolicy);
  const scopesRequired =
    statePolicy.matchingPolicy === "PATH" ||
    statePolicy.matchingPolicy === "REGEXP";
  const scopesMissing = scopesRequired && statePolicy.scopes.length === 0;

  const canSubmit = policyChanged && !entityIsNull && !scopesMissing;

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
    toast(response);
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
    setStatePolicy({ ...statePolicy, matchingPolicy, scopes: [] });
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

  function reset() {
    setStatePolicy(originalPolicy);
    setAccountType(getDefaultAccountType(originalPolicy));
  }

  return (
    <Form className="panel space-y-4 border-none" onReset={reset}>
      <Field>
        <Label data-required>Policy name</Label>
        <Input
          type="text"
          name="description"
          title="Description"
          placeholder="Default Deny ALL policy"
          value={statePolicy.description}
          onChange={updateDescription}
          disabled={!readWrite}
          autoComplete="off"
          required
        />
        <Description>Something users will recognize and trust</Description>
      </Field>
      <div className="flex gap-5">
        <Field>
          <Label>Rule</Label>
          <Select
            name="rule"
            defaultValue={statePolicy.rule}
            onChange={updateRule}
            disabled={!readWrite}
          >
            {ruleOptions.map(rule => (
              <Option key={rule} value={rule}>
                {rule}
              </Option>
            ))}
          </Select>
          <Description>Permit or deny this policy</Description>
        </Field>
        <Field>
          <div className="flex items-center gap-1">
            <Label>Matching policy</Label>
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
          <Select
            name="matchingPolicy"
            defaultValue={statePolicy.matchingPolicy}
            onChange={updateMatchingPolicy}
            disabled={!readWrite}
          >
            {matchingPolicyOptions.map(mp => (
              <Option key={mp} value={mp}>
                {mp}
              </Option>
            ))}
          </Select>
          <Description>Select the right matching policy</Description>
        </Field>
      </div>
      <Field>
        <Label>Target</Label>
        <AccountGroupSelector
          defaultValue={defaultAccountType}
          onChange={updateAccountType}
          disabled={!readWrite}
        />
        <Description>
          Select which target to apply the policy to: User, Group, or both.
        </Description>
      </Field>
      <SearchTarget
        key={accountType}
        accountType={accountType}
        defaultValue={initialEntity}
        onChange={updateEntity}
        disabled={!readWrite}
      />
      <Field>
        <Label>Scope matchers</Label>
        <InputList
          value={statePolicy.scopes}
          name="scopes"
          type="text"
          placeholder={scopePlaceholders[statePolicy.matchingPolicy]}
          required={scopesRequired}
          onChange={handleScopesChange}
          disabled={!readWrite}
        />
        <Description>
          Scope matchers this policy applies to. Required for PATH and REGEXP.
        </Description>
      </Field>
      {readWrite && (
        <div className="flex justify-between">
          {isEditing && <DeletePolicyButton policy={statePolicy} />}
          <div className="ml-auto flex justify-end gap-2">
            <Button variant="underline" type="reset">
              Reset
            </Button>
            <SaveButton
              policy={statePolicy}
              disabled={!canSubmit}
              isEditing={isEditing}
              accountType={accountType}
              onConfirm={handleConfirm}
            />
          </div>
        </div>
      )}
    </Form>
  );
}
