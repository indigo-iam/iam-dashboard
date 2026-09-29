// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { Notice, Warning } from "@/components/notices";
import { ScopePolicy } from "@/models/scope-policies";
import { deleteScopePolicy } from "@/services/scope-policies";

type DeletePolicyModal = {
  show: boolean;
  onClose: () => void;
  policy: ScopePolicy;
  onDeleted?: () => void;
};

export default function DeletePolicyModal(props: Readonly<DeletePolicyModal>) {
  const { show, onClose, policy, onDeleted } = props;
  const handleConfirm = async () => {
    await deleteScopePolicy(policy.id);
    onDeleted?.();
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
      <p>Are you sure you want to delete the following policy?</p>
      <Notice>
        <p>
          <b>{policy.description}</b>
        </p>
      </Notice>
      <Warning>
        <p>Delete the policy to completely remove it from the organization.</p>
        <p>
          This will revoke the permit/deny rule for the associated account,
          group, or both.
        </p>
        <p>
          <b>This action cannot be undone.</b>
        </p>
      </Warning>
    </ConfirmModal>
  );
}
