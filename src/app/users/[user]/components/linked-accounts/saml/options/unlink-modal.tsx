// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import ConfirmModal from "@/components/confirm-modal";
import { Warning } from "@/components/notices";
import { useProgressBar } from "@/components/progress-bar";
import { toast } from "@/components/toaster";
import { SamlId } from "@/models/indigo-user";
import { unlinkExternalSamlAccount } from "@/services/users";

type UnlinkAccountModalProps = {
  userId: string;
  samlId: SamlId;
  show: boolean;
  onClose: () => void;
};

export default function UnlinkAccountModal(
  props: Readonly<UnlinkAccountModalProps>
) {
  const { userId, samlId, show, onClose } = props;
  const { startTransition } = useProgressBar();

  function handleConfirm() {
    startTransition(async () => {
      const res = await unlinkExternalSamlAccount(
        userId,
        samlId.attributeId,
        samlId.idpId,
        samlId.userId
      );
      if (res) {
        toast.toast(res);
      }
    });
    onClose();
  }

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      title="Unlink SAML account?"
      onConfirm={handleConfirm}
      danger
    >
      <div className="space-y-6">
        <p className="text-center">
          Are you sure you want to unlink the following account?
        </p>
        <div className="flex flex-col items-center gap-2">
          <div>
            <p>
              <span className="inline-block min-w-24 text-end text-xs font-light text-gray-500 dark:text-gray-300">
                Identity Provider
              </span>{" "}
              {samlId.idpId}
            </p>
            <p>
              <span className="inline-block min-w-24 text-end text-xs font-light text-gray-500 dark:text-gray-300">
                User ID
              </span>{" "}
              {samlId.userId}
            </p>
            <p>
              <span className="inline-block min-w-24 text-end text-xs font-light text-gray-500 dark:text-gray-300">
                Attribute ID
              </span>{" "}
              {samlId.attributeId}
            </p>
          </div>
        </div>
        <Warning>
          <p>
            Login with the above linked account will NOT be possible if you
            proceed.
          </p>
        </Warning>
      </div>
    </ConfirmModal>
  );
}
