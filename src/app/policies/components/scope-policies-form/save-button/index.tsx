// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button } from "@/components/buttons";
import ConfirmModal, { ConfirmModalProps } from "@/components/confirm-modal";
import { Notice } from "@/components/notices";
import { AccountType, ScopePolicy } from "@/models/scope-policies";

import { getEntityFromPolicy } from "../utils";
import { useState } from "react";

type ScopePolicyConfirmModal = ConfirmModalProps & {
  policy: ScopePolicy;
  isEditing: boolean;
  accountType: AccountType;
};

function ScopePolicyConfirmModal(props: Readonly<ScopePolicyConfirmModal>) {
  const { policy, isEditing, accountType, ...others } = props;
  return (
    <ConfirmModal {...others}>
      <div className="space-y-4">
        <p>
          {`Are you sure you want to ${isEditing ? "update" : "add"} this scope policy?`}
        </p>
        <Notice>
          <p>
            <b>Description: </b>
            {policy.description}
          </p>
          <p>
            <b>Rule: </b>
            {policy.rule}
          </p>
          <p>
            <b>Matching Policy: </b>
            {policy.matchingPolicy}
          </p>
          <p>
            <b>Target: </b>
            {accountType === "ALL"
              ? "accounts and groups"
              : (getEntityFromPolicy(policy)?.name ?? "-")}
          </p>
          <p>
            <b>Scopes: </b>
            {policy.scopes.length === 0 ? "all" : policy.scopes.join(" ")}
          </p>
        </Notice>
      </div>
    </ConfirmModal>
  );
}

type SaveButtonProps = {
  policy: ScopePolicy;
  disabled?: boolean;
  isEditing: boolean;
  accountType: AccountType;
  onConfirm: () => void;
};

export function SaveButton(props: Readonly<SaveButtonProps>) {
  const { policy, disabled, isEditing, accountType, onConfirm } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Button type="button" onClick={open} disabled={disabled}>
        {isEditing ? "Save changes" : "Add Scope Policy"}
      </Button>
      <ScopePolicyConfirmModal
        title={isEditing ? "Edit Scope Policy" : "Create Scope Policy"}
        show={show}
        onClose={close}
        onConfirm={onConfirm}
        policy={policy}
        isEditing={isEditing}
        accountType={accountType}
      />
    </>
  );
}
