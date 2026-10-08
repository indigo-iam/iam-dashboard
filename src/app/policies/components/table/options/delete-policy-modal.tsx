// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { Notice, Warning } from "@/components/notices";
import { toast } from "@/components/toaster";
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
    const response = await deleteScopePolicy(policy.id);
    const success = response.type === "success";
    if (success) {
      response.description = `Policy "${policy.description}" has been deleted`;
    }
    toast.toast(response);
    if (success) {
      onDeleted?.();
    }
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
        <p>
          Deliting this policy will permanently remove it from the organization.
          User/Group it applies to may gain more access than intended.
        </p>
        <p>
          <b>This action cannot be undone.</b>
        </p>
      </Warning>
    </ConfirmModal>
  );
}
