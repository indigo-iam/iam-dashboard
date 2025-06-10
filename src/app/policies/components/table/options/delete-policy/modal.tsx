// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { ScopePolicy } from "@/models/scope-policies";

type DeletePolicyModal = {
  show: boolean;
  onClose: () => void;
  policy: ScopePolicy;
};

export default function DeletePolicyModal(props: Readonly<DeletePolicyModal>) {
  const { show, onClose, policy } = props;
  const handleConfirm = async () => {
    console.log("TODO");
    onClose();
  };
  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Delete Policy"
      title="Delete Policy"
      onConfirm={handleConfirm}
      data-test="modal"
      danger={true}
    >
      Are you sure you want to delete policy <b>{policy.description}</b>
    </ConfirmModal>
  );
}
