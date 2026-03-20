// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import ConfirmModal from "@/components/confirm-modal";
import { OidcId } from "@/models/indigo-user";

type UnlinkAccountModalProps = {
  oidcId: OidcId;
  show: boolean;
  onClose: () => void;
};

export default function UnlinkAccountModal(
  props: Readonly<UnlinkAccountModalProps>
) {
  const { oidcId, show, onClose } = props;

  const handleConfirm = async () => {
    // TODO: implement action
    console.log("Unlink account!");
    onClose();
  };

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      title="Unlink OpenID Connect/OAuth2 account"
      onConfirm={handleConfirm}
      danger
    >
      <p>Are you sure you want to unlink the following OAuth2 account?</p>
      <div className="flex grow flex-col gap-2">
        <div>
          <p className="text-xs font-light text-gray-500 dark:text-gray-300">
            Issuer
          </p>
          <p>{oidcId.issuer}</p>
        </div>
        <div>
          <p className="text-xs font-light text-gray-500 dark:text-gray-300">
            Subject
          </p>
          <p>{oidcId.subject}</p>
        </div>
      </div>
    </ConfirmModal>
  );
}
