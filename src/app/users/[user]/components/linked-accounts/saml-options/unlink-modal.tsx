// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import ConfirmModal from "@/components/confirm-modal";
import { SamlId } from "@/models/indigo-user";

type UnlinkAccountModalProps = {
  samlId: SamlId;
  show: boolean;
  onClose: () => void;
};

export default function UnlinkAccountModal(
  props: Readonly<UnlinkAccountModalProps>
) {
  const { samlId, show, onClose } = props;

  const handleConfirm = async () => {
    // TODO: implement action
    console.log("Unlink account!");
    onClose();
  };

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Remove Membership"
      title="Remove User Membership"
      onConfirm={handleConfirm}
      danger
    >
      <p>Are you sure you want to unlink the account</p>
      <ul>
        <li className="flex min-w-32 items-end gap-2 p-2">
          <span className="align-text-bottom text-sm leading-none font-light">
            User ID
          </span>
          <span className="leading-none">{samlId.userId}</span>
        </li>
        <li className="flex min-w-32 items-end gap-2 p-2">
          <span className="text-sm leading-none font-light">IdP ID</span>
          <span className="leading-none">{samlId.idpId}</span>
        </li>
        <li className="flex min-w-32 items-end gap-2 p-2">
          <span className="text-sm leading-none font-light">Attribute ID</span>
          <span className="leading-none">{samlId.attributeId}</span>
        </li>
      </ul>
    </ConfirmModal>
  );
}
