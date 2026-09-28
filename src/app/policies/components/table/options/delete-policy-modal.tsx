// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { ScopePolicy } from "@/models/scope-policies";
import { deleteScopePolicy } from "@/services/scope-policies";

type DeletePolicyModal = {
  show: boolean;
  onClose: () => void;
  policy: ScopePolicy;
};

export default function DeletePolicyModal(props: Readonly<DeletePolicyModal>) {
  const { show, onClose, policy } = props;
  const handleConfirm = async () => {
    await deleteScopePolicy(policy.id);
  };
  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Delete"
      title="Delete policy"
      onConfirm={handleConfirm}
      danger={true}
    >
      Are you sure you want to delete policy <b>{policy.description}</b>?
    </ConfirmModal>
  );
}
