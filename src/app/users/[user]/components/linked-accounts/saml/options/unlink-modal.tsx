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
      title="Unlink SAML account"
      onConfirm={handleConfirm}
      danger
    >
      <p className="text-base">
        Are you sure you want to unlink the following account?
      </p>
      <div className="flex grow flex-col gap-2">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-300">
            Identity Provider
          </p>
          <p className="break-all text-gray-950 dark:text-gray-100">
            {samlId.idpId}
          </p>
        </div>
        <div>
          <p className="text-xs font-light text-gray-500 dark:text-gray-300">
            User ID
          </p>
          <p>{samlId.userId}</p>
        </div>
        <div>
          <p className="text-xs font-light text-gray-500 dark:text-gray-300">
            Attribute ID
          </p>
          <p>{samlId.attributeId}</p>
        </div>
      </div>
    </ConfirmModal>
  );
}
