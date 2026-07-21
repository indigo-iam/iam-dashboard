// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import ConfirmModal from "@/components/confirm-modal";
import { Warning } from "@/components/notices";
import { useProgressBar } from "@/components/progress-bar";
import { toast } from "@/components/toaster";
import { OidcId } from "@/models/indigo-user";
import { unlinkOidcAccount } from "@/services/users";

type UnlinkAccountModalProps = {
  userId: string;
  oidcId: OidcId;
  show: boolean;
  onClose: () => void;
};

export default function UnlinkAccountModal(
  props: Readonly<UnlinkAccountModalProps>
) {
  const { userId, oidcId, show, onClose } = props;
  const { startTransition } = useProgressBar();

  function handleConfirm() {
    startTransition(async () => {
      const res = await unlinkOidcAccount(userId, oidcId);
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
      title="Unlink OIDC/OAuth2 account?"
      onConfirm={handleConfirm}
      danger
    >
      <div className="space-y-6">
        <p className="text-center">
          Are you sure you want to unlink the following account?
        </p>
        <div className="flex grow flex-col items-center gap-2">
          <div>
            <p>
              <span className="inline-block min-w-12 text-end text-xs font-light text-gray-500 dark:text-gray-300">
                Issuer
              </span>{" "}
              {oidcId.issuer}
            </p>
            <p>
              <span className="inline-block min-w-12 text-end text-xs font-light text-gray-500 dark:text-gray-300">
                Subject
              </span>{" "}
              {oidcId.subject}
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
