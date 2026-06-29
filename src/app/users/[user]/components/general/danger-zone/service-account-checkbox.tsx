// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import ConfirmModal from "@/components/confirm-modal";
import { Field, LabeledCheckbox } from "@/components/form";
import { ModalProps } from "@/components/modal";
import { setServiceAccount } from "@/services/users";
import { toast } from "@/components/toaster";

type ServiceAccountModalProps = ModalProps & {
  userId: string;
  userFormattedName: string;
  enabled: boolean;
};

function ServiceAccountModal(props: Readonly<ServiceAccountModalProps>) {
  const { userId, userFormattedName, enabled, show, onClose } = props;

  async function toggleServiceAccount() {
    const res = await setServiceAccount(userId, !enabled);
    toast.toast(res);
  }

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      onConfirm={toggleServiceAccount}
      title={`${enabled ? "Disable" : "Enable"} service account`}
      confirmButtonText={`${enabled ? "Disable" : "Enable"} service account`}
      danger
    >
      {"Are you sure you want to set the user "}
      <b>{userFormattedName}</b>
      {` as ${enabled ? "regular" : "service"} account?`}
    </ConfirmModal>
  );
}

type ServiceAccountCheckboxProps = {
  userId: string;
  userFormattedName: string;
  enabled: boolean;
};

export function ServiceAccountCheckbox(
  props: Readonly<ServiceAccountCheckboxProps>
) {
  const { userId, userFormattedName, enabled } = props;
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <Field>
      <LabeledCheckbox checked={enabled} onChange={open}>
        service account
      </LabeledCheckbox>
      <ServiceAccountModal
        show={show}
        onClose={close}
        userId={userId}
        userFormattedName={userFormattedName}
        enabled={enabled}
      />
    </Field>
  );
}
