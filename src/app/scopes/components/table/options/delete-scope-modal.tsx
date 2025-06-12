// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { Scope } from "@/models/client";
import { deleteScope } from "@/services/scopes";

type DeleteScopeButtonProps = {
  scope: Scope;
  show: boolean;
  onClose: () => void;
};

export default function DeleteScopeModal(
  props: Readonly<DeleteScopeButtonProps>
) {
  const { scope, show, onClose } = props;
  const action = async () => {
    await deleteScope(scope);
    onClose();
  };
  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      title="Delete Scope"
      onConfirm={action}
      danger
    >
      <p>
        Are you sure you want to delete the scope <b>{scope.value}</b>?
      </p>
    </ConfirmModal>
  );
}
